import { validateRUT } from '../../lib/validateRut'

export { Page }

function Page() {

  const handleSubmit = (e) => {
    const rut = e.target.rut.value
    if (!validateRUT(rut)) {
      e.preventDefault();
      alert('Rut inválido. Por favor, verifica tu rut e intenta nuevamente.')
    }
  }

  return (
    <>
      <div className="flex flex-col flex-wrap justify-center content-center h-screen">
        <h1 className="text-xl md:text-3xl font-semibold text-stone-400">Portal Paciente</h1>
        <h2 className="text-3xl md:text-5xl font-bold text-rm-blue-100 mb-4">Ingresa a tu Portal</h2>
        <div className="flex flex-col justify-center content-center">
          <form className="flex flex-col justify-center items-center" method="POST" action="/api/rut/validate" onSubmit={handleSubmit}>
            <input 
              className="p-2 text-center border-2 border-solid border-rm-blue-100 active:border-rm-blue-100 rounded-tl-full rounded-tr-full rounded-br-full rounded-bl-full w-full " 
              type="text" 
              name="rut"
              placeholder="Ingresa tu Rut"
              required
              />
            <button
              type="submit"
              className="font-semibold text-[white] tracking-wider bg-rm-blue-100 hover:bg-rm-blue-200 p-2 rounded-tl-full rounded-tr-full rounded-br-full rounded-bl-full mt-4 w-full">
                SIGUIENTE
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
