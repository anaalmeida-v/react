import { useLocation } from "react-router-dom";
import { useMemo } from "react";

export function useQuery() {//função do hook
    const { search } = useLocation()//resgatando 'search' de 'useLocation()'

    return useMemo(() => new URLSearchParams(search), [search])//envolve-se o Memo nas funções
    //URLSearchParams - obj javascript que vai buscar parâmetro determinado na busca e entregar para mim
    //useMemo recebe array de dependências - no ex.: [search], ou seja, essa função só será executada quando search for alterado
}