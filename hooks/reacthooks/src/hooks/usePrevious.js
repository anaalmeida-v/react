import { useEffect, useRef, useDebugValue } from "react"

export const usePrevious = (value) => {//exportação de uma constante(função do hook)- recebe valor(value): valor que existe antes da mudança do mesmo no useState
  const ref = useRef()

  useDebugValue("--- custom hook e usedebugvalue ---")//para execução basta colocar o hook e uma string
  useDebugValue("o número anterior é: " + value)

  useEffect(() => {//utilizado sempre que o hook for solicitado
    ref.current = value
  })//assim é possível salvar o estado antigo de um valor
  //interessante quando o valor será mudado, mas o estado antigo também importa

  return ref.current
}
