import { useContext } from 'react'
import { CounterContext } from '../context/CounterContext'

export const useCounterContext = () => {//criacao do hook

    const context = useContext(CounterContext)//chamando hook na variavel context

    if (!context) {
        console.log("Contexto não encontrado!")
    }//se nao houver context, exibe a mensagem acima

    return context
}