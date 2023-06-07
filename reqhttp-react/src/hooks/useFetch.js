import { useEffect, useState } from "react"

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
    const [error, setError] = useState(false)

    const httpConfig = (data, method) => {
        if (method === "POST") {
            setConfig({
                method,//valor ja esta sendo passado para funcao do escopo acima, entao nao precisa ser citado
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(data),//alterando as configs para json

            })

            setMethod("POST")
        }
    }

    useEffect(() => {
        const fetchData = async () => {

            //6 - loading
            setLoading(true)

            // 8 - tratando erros
            try {
                const res = await fetch(url)

                const json = await res.json()

                setData(json)

                setMethod(null)
                // 8 - tratando erros
                setError(null)
            } catch (error) {

                setError("Houve um erro ao carregar os dados!")
                console.log(error.message)

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