import { useState, useEffect } from "react"
import { db } from "../firebase/config"
import {
    collection,//definir coleção
    query,//resgatar dado
    orderBy,//ordenacao
    onSnapshot,
    where,//filtro dos resultados que estão sendo trazidos
} from "firebase/firestore"

export const useFetchDocuments = (docCollection, search = null, uid = null) => {//pegando dados, recebendo parametro de busca
    //search - será feita uma busca baseada nas tags do post

    const [documents, setDocuments] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    //deal with memory leak - lidar com vazamento de memória 
    const [cancelled, setCancelled] = useState(false)

    useEffect(() => {
        async function loadData() {//se tiver cancelada retorna
            if (cancelled)
                return

            setLoading(true)//carregando dados

            const collectionRef = await collection(db, docCollection);//referencia collection, para assim poder ser usada em outro lugar

            try {//tratar de erros da busca/extreção de dados

                let q//para criar query's mais complexas

                //busca

                //dashboard

                if (search) {
                    q = await query(collectionRef, where("tagsArray", "array-contains", search), orderBy("createdAt", "desc"))//desc - descendente(do + novo p/ + velho)
                    //array-contains: parâmetro do firebase//vendo se busca esta no array



                } else {
                    q = await query(collectionRef, orderBy("createdAt", "desc"));//criando busca de dados
                }
                await onSnapshot(q, (querySnapshot) => {//onSnapshot: mapear dados - smp que houver um dado alterado, será retornado renovado para nós

                    setDocuments(
                        querySnapshot.docs.map((doc) => ({
                            id: doc.id,//id do doc vem separado dos dados
                            ...doc.data(),//criar outras chaves baseado no que vem de doc.data

                        }))//acessa docs que vem do firebase e faz um map nesses docs()individualmente
                    )
                })

                setLoading(false)

            } catch (error) {
                console.log(error)
                setError(error.message)
            }
        }
        loadData()
    }, [docCollection, search, uid, cancelled])//cada vez q mudar algum desses dados, loadData() será executada

    useEffect(() => {
        return () => setCancelled(true)//assim n carregamos dados do component qnd ele desmontar
    }, [])

    return { documents, loading, error }
}