// 1 - criar contexto
import { createContext, useState } from 'react'

export const CounterContext = createContext()

// 2 - criar provider
export const CounterContextProvider = ({children}) =>  {
//o nome do provider é algo relativo ao context mas com provider no fim

//contexto a ser compartilhado entre elementos
    const [counter, setCounter] = useState(5)

    return(
        <CounterContext.Provider value={{counter, setCounter}}>
        {/* NomeContext.Provider value={{valorConsumo valorAlteracao}} */}
            {children}
        {/*children - encapsular elementos e poder imprimir conteudo deles dentro de outro component*/}
        </CounterContext.Provider>
    )
}