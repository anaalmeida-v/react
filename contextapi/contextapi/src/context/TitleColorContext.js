import { createContext, useReducer } from "react";

export const TitleColorContext = createContext()

export const titleColorReducer = (state, action) => {

    switch (action.type) {//switch é feito em cima dessa action.type
        case "RED"://os tipos de ação são todos em letra maiúscula e string
            return { ...state, color: "red" }
        case "BLUE":
            return { ...state, color: "blue" }//retorna todos os dados do state( ...state) e muda propriedade(color:"blue")
        default://quando não aocntece nada, retornará o state()cor roxa, definita no hook  
            return state
    }

}

export const TitleColorContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(titleColorReducer, { color: "purple" })//pode-se colocar um valor que já vai ser alterado ao iniciar(nesse caso {color: "purple"})
    //esta sendo passado quem altera o estado e quem é o estado inicial(basicamente state entrega uma maneira de alterar o estado e dispatch altera)
    ///state - estado do hook atual - o que ele esta gerenciando
    ////dispatch - função/o que vai alterar o contexto depois

    console.log("Title Color Context: ", state)

    return (
        <TitleColorContext.Provider value={{ ...state, dispatch }}>{/* esse é o state a ser consumido na aplicação */}
            {children}
        </TitleColorContext.Provider>
    )
}