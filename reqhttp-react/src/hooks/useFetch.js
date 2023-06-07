import { useState, useEffect } from "react"

//4 - custom hook
export const useFetch = (url) => {//exporta funcao - puxa url da api

    const[data, setData] = useState(null)//null pos ainda nao sabemos do que se trata(string, array)

    useEffect(() => {

        const fetchData = async () => {
            const res = await fetch(url)

            const json = await res.json()

            setData(json)
        }
        fetchData()
    }, [url])

    return { data }//dados a serem utilizados na aplicacao
}