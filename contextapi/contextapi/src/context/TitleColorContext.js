import { createContext, useReducer } from "react";

export const TitleColorContext = createContext()

export const titleColorReducer = (state, action) => {
    //switch
}

export const TitleColorContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(titleColorReducer, {color:"purple"})//pode-se colocar um valor que já vai ser alterado ao iniciar(nesse caso {color: "purple"})
    //esta sendo passado quem altera o estado e quem é o estado inicial(basicamente state entrega uma maneira de alterar o estado e dispatch altera)
    //state - estado do hook atual - o que ele esta gerenciando
    ///dispatch - função/o que vai alterar o contexto depois

    console.log("Title Color Context: ", state)

    return(
        <TitleColorContext.Provider value={{ ...state }}>
            {children}
        </TitleColorContext.Provider>
    )
}