import { useState, useEffect } from "react"
import { db } from "../firebase/config"
import {
    doc,//ter instância do documento em métodos que o envolvem
    getDoc,
    setDoc,//método que permite a gente de pegar um documento do banco de dados
} from "firebase/firestore"

export const useFetchDocument = (docCollection, id) => {//resgatando docCollection, pois usuário precisa informar a coleção desejada, para que sabemos de onde resgatar os dados
    //search - será feita uma busca baseada nas tags do post

    const [document, setDocument] = useState(null)//document no singular por ser só um documento
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    //deal with memory leak - lidar com vazamento de memória 
    const [cancelled, setCancelled] = useState(false)
    useEffect(() => {
        async function loadDocument() {//se tiver cancelada retorna
            if (cancelled) return

            setLoading(true)//carregando dados

            try {

                const docRef = await doc(db, docCollection, id)
                //referencia de um doc - função assin, resgata db, docCollection(é enviada na hora de invocar o hook) e id que precisa ser enviado junto com a docCollection
                const docSnap = await getDoc(docRef)//snap do documento//passando referencia do doc no getDoc

                //as 2 funções tem await pois precisamos esperar acontecer

                setDocument(docSnap.data())//com o .data obtemos dados vindos do getDoc

                setLoading(false)//cancelando loading


            } catch (error) {
                console.log(error)
                setError(error.message)

                setLoading(true)
            }

        }
        loadDocument()
    }, [docCollection, id, cancelled])//cada vez q mudar algum desses dados, loadDocument() será executada

    useEffect(() => {
        return () => setCancelled(true)//assim n carregamos dados do component qnd ele desmontar
    }, [])

    return { document, loading, error }
}