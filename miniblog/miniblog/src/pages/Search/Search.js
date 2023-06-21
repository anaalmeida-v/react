import React from 'react'

//hooks
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import { useQuery } from '../../hooks/useQuery'//esse hook serve para pegar parâmetros da URL de uma forma mais profissional, onde 
//estamos separando funcionalidades do sistema

const Search = () => {
    const query = useQuery()//buscando parâmetro de useQuery()
    const search = query.get("q")//esse método get vem de URLSearchParams(obj javascript)
    //'q' foi definido no if de (query) em home

    return (
        <div>
            <h2>Search</h2>
            <p>{search}</p>
        </div>
    )
}

export default Search