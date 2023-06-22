import { useState, useEffect, useReducer } from "react"//useReducer sera usado para fzr o esquema de loading e errors com o switch
import { db } from '../firebase/config'
import { doc, deleteDoc } from "firebase/firestore"

const initialState = {
    loading: null,
    error: null
}

const deleteReducer = (state, action) => {//aceita estado e ação que será executada

    switch (action.type) {//checagem do tipo da ação
        case "LOADING"://caso carregando
            return { loading: true, }
        case "DELETE_DOC"://exclua
            return { loading: false, error: null }
        case "ERROR"://caso erro   
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const useDeleteDocument = (docCollection) => {

    const [response, dispatch] = useReducer(deleteReducer, initialState)//funcao q trata dos events do reducer e o estado inicial

    //deal with memory leak - lidar com vazamento de memória 
    const [cancelled, setCancelled] = useState(false)

    const checkCancelBeforeDispatch = (action) => {//antes de fzr qlqr ação vai verificar se está cancelado ou não
        if (!cancelled) {
            dispatch(action)
        }
    }

    const deleteDocument = async (id) => {

        checkCancelBeforeDispatch({
            type: "LOADING",
        })//loading antes de EXCLUSAO de doc

        try {
            const deleteDocument = await deleteDoc(doc(docCollection, id))

            checkCancelBeforeDispatch({
                type: "DELETE_DOC",
                payload: deleteDocument,
            })

        } catch (error) {
            checkCancelBeforeDispatch({
                type: "ERROR",
                payload: error.message,
            })
        }
    }
    useEffect(() => {
        return () => {
            setCancelled(true)
        }
    }, [])

    return { deleteDocument, response }
}