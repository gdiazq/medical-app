export { useUser }

import { usePageContext } from '../renderer/usePageContext'  

function useUser() {
    const { user } = usePageContext()
    return user
}