export { useData }

import { usePageContext } from '../renderer/usePageContext'

function useData() {
    const { data } = usePageContext()
    return data
}