export { guard };

import { render } from 'vike/abort';

const guard = async (pageContext) => {
    const { user } = pageContext;
    if (!user?.logged) {
        throw render('/');
    }
}