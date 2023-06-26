import { useState, useEffect, useReducer } from "react"//useReducer sera usado para fzr o esquema de loading e errors com o switch
import { db } from '../firebase/config'
import { updateDoc, doc } from "firebase/firestore"

const initialState = {
  loading: null,
  error: null
}

const updateReducer = (state, action) => {//aceita estado e ação que será executada

  switch (action.type) {//checagem do tipo da ação
    case "LOADING"://caso carregando
      return { loading: true, }
    case "UPDATED_DOC"://caso inserindo ou inserido
      return { loading: false, error: null }
    case "ERROR"://caso erro   
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const useUpdateDocument = (docCollection) => {

  const [response, dispatch] = useReducer(updateReducer, initialState)//funcao q trata dos events do reducer e o estado inicial

  //deal with memory leak - lidar com vazamento de memória 
  const [cancelled, setCancelled] = useState(false)

  const checkCancelBeforeDispatch = (action) => {//antes de fzr qlqr ação vai verificar se está cancelado ou não
    if (!cancelled) {
      dispatch(action)
    }
  }

  const updateDocument = async (id, data) => {

    checkCancelBeforeDispatch({
      type: "LOADING",
    })//loading antes de inserção de doc

    try {

        const docRef = await doc(db, docCollection, id)//id do documento

        const updatedDocument = await updateDoc(docRef, data)

        checkCancelBeforeDispatch({
            type: "UPDATE_DOC",
            payload: updatedDocument,
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

  return { updateDocument, response }
}