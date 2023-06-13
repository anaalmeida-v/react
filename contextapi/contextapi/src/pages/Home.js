import { useContext  } from "react"//importando forma de se usar o contexto

import { CounterContext } from "../context/CounterContext"//importando variavel com elementos a serem utilizados

const Home = () => {
  const { counter } = useContext(CounterContext)//desustruturando counter do useContext-CounterContext

  return (
    <div>
      <h1>Home</h1>
      <p>Valor do contador: {counter}</p>
    </div>
  )
}

export default Home