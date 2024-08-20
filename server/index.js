import express from 'express'
import compression from 'compression'
import { renderPage } from 'vike/server'
import { root } from './root.js'
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

const isProduction = process.env.NODE_ENV === 'production'

startServer()

async function startServer() {
  const app = express()

  app.use(compression())
  app.use(cookieParser());
  app.use(express.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  if (isProduction) {
    const sirv = (await import('sirv')).default
    app.use(sirv(`${root}/dist/client`))
  } else {
    const vite = await import('vite')
    const viteDevMiddleware = (
      await vite.createServer({
        root,
        server: { middlewareMode: true }
      })
    ).middlewares
    app.use(viteDevMiddleware)
  }

  app.get('*', async (req, res, next) => {
    const logged = !!req.cookies['token']; 
    const pageContextInit = {
      urlOriginal: req.originalUrl,
      headersOriginal: req.headers,
      user: {
        logged,
      },
    };
    const pageContext = await renderPage(pageContextInit)
    if (pageContext.errorWhileRendering) {
      // Install error tracking here, see https://vike.dev/errors
    }
    const { httpResponse } = pageContext
    if (!httpResponse) {
      return next()
    } else {
      const { body, statusCode, headers, earlyHints } = httpResponse
      if (res.writeEarlyHints) res.writeEarlyHints({ link: earlyHints.map((e) => e.earlyHintLink) })
      headers.forEach(([name, value]) => res.setHeader(name, value))
      res.status(statusCode)
      res.send(body)
    }
  })

  app.post('/api/rut/validate', async (req, res) => {
    try {
      const { rut } = req.body
      const response = await fetch(`http://rec-staging.recemed.cl/api/users/exists?rut=${rut}`);
      const user = await response.json();
      if (user?.data) {
        res.cookie('rut', rut, {
          maxAge: 24 * 60 * 60 * 1000,
          httpOnly: true
        })
        res.redirect('/login');
      } else {
        console.log('Rut inválido. Por favor, verifica tu rut e intenta nuevamente.')
      }
    } catch (error) {
      console.error(error)
    }
  });

  app.post('/api/login/validate', async (req, res) => {
    try {
      const { rut } = req.cookies;
      const { password } = req.body;
    
      const response = await fetch("http://rec-staging.recemed.cl/api/users/log_in", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user: { rut, password } })
      });
      const user = await response.json();
    
      if (user?.data) {
        const { token, profiles } = user.data;
    
        res.cookie('token', token, {
          maxAge: 24 * 60 * 60 * 1000
        });

        res.cookie('user-data', JSON.stringify(profiles), {
          maxAge: 24 * 60 * 60 * 1000
        });

        res.redirect('/dashboard');
      } 
    } catch (error) {
      console.error(error);
    }
  });

  const port = process.env.PORT || 3000
  app.listen(port)
  console.log(`Server running at http://localhost:${port}`)
}
