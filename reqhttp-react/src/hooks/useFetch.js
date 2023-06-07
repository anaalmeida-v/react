import { useState, useEffect } from "react"

//4 - custom hook
export const useFetch = (url) => {//exporta funcao - puxa url da api

    const [data, setData] = useState(null)//null pos ainda nao sabemos do que se trata(string, array)

    //5 - refatorando post
    const [config, setConfig] = useState(null)
    const [method, setMethod] = useState(null)
    const [callFetch, setCallFetch] = useState(false)

    //6 - loading
    const [loading, setLoading] = useState(false)

    //7 - tratando erros
    const [error, setError] = useState(null)

    const httpConfig = (data, method) => {
        if (method === "POST") {
            setConfig({
                method,//valor ja esta sendo passado para funcao do escopo acima, entao nao precisa ser citado
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(data),//alterando as configs para json

            })

            setMethod(method)
        }
    }

    useEffect(() => {
        const fetchData = async () => {

            //6 - loading
            setLoading(true)

            try {
                const res = await fetch(url)

                const json = await res.json()

                setData(json)
            } catch(error){
                console.log(error.message)

                setError("Houve algum erro ao carregar os dados!")
            }
            setLoading(false)
        }
        fetchData()
    }, [url, callFetch])//smp que houver a alteração os dados serão novamente chamados

    //5 - refatorando post
    useEffect(() => {

        const httpRequest = async () => {
            if (method === "POST") {
                let fetchOptions = [url, config]

                const res = await fetch(...fetchOptions)

                const json = await res.json()

                setCallFetch(json)
            }
        }

        httpRequest()
    }, [config, method, url])

    return { data, httpConfig, loading, error }//dados a serem utilizados na aplicacao
}