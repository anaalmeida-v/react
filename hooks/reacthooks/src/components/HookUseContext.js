import { getValue } from "@testing-library/user-event/dist/utils";
import { createContext } from "react";

export const SomeContext = createContext();

export const HookUseContext = ({ children }) => {//propriedade children faz com que seja possível colocar elementos dentro
    const contextValue = "testing context"

    return(
        <SomeContext.Provider value={{contextValue}}>
            {children}
        </SomeContext.Provider>//para prover contexto em outros componentes 
    )
}
