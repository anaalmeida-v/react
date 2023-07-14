import { useLocation } from 'react-router-dom'
import { useMemo } from 'react'//faz com que algo possa ser atrelado a uma referência e não a um valor
//não altera estado do componente se ele for acessado//componente não re-renderiza

export function useQuery() {
    const { search } = useLocation()

    return useMemo(() => new URLSearchParams(search), [search])//a partir disso dados podem ser extraídos como objetos

}