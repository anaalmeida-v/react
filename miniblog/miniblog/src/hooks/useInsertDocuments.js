import { useState, useEffect, useReducer } from "react"//useReducer sera usado para fzr o esquema de loading e errors com o switch
import { db } from '../firebase/config'
import { collection, addDoc, Timestamp } from "firebase/firestore"
//collections - tabela firebase//addDoc - insert do Doc no banco de dados// Timestamp-marcar horário que foi criado

const initialState = {
  loading: null,
  error: null
}

const insertReducer = (state, action) => {//aceita estado e ação que será executada

  switch (action.type) {//checagem do tipo da ação
    case "LOADING"://caso carregando
      return { loading: true, }
    case "INSERTED_DOC"://caso inserindo ou inserido
      return { loading: false, error: null }
    case "ERROR"://caso erro   
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const useInsertDocuments = (docCollection) => {

  const [response, dispatch] = useReducer(insertReducer, initialState)//funcao q trata dos events do reducer e o estado inicial

  //deal with memory leak - lidar com vazamento de memória 
  const [cancelled, setCancelled] = useState(false)

  const checkCancelBeforeDispatch = (action) => {//antes de fzr qlqr ação vai verificar se está cancelado ou não
    if (!cancelled) {
      dispatch(action)
    }
  }

  const insertDocuments = async (document) => {

    checkCancelBeforeDispatch({
      type: "LOADING",
    })//loading antes de inserção de doc

    try {
      const newDocument = { ...document, createdAt: Timestamp.now() }//pegando dados que foram passados 
      //para esta funcao //timestamp.now - a partir deste momento temos a data de agora

      const insertDocuments = await addDoc(collection(db, docCollection), newDocument)
      //resultado da inserção do dado passando método 'collection', passa 'db' da config de firebase
      //procura no banco de dados coleção passada como argumento da função

      checkCancelBeforeDispatch({
        type: "INSERTED_DOC",
        payload: insertDocuments,
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

  return { insertDocuments, response }
}