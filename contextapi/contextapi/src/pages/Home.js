//import { useContext  } from "react"//importando forma de se usar o contexto
import ChangeCounter from "../components/ChangeCounter"
//import { CounterContext } from "../context/CounterContext"//importando variavel com elementos a serem utilizados

//4 - refatorando com hook
import { useCounterContext } from "../hooks/useCounterContext"//importando hook que contem o context

//5 - context mais complexo
import { useTitleColorContext } from "../hooks/useTitleColorContext"

const Home = () => {
  //const { counter } = useContext(CounterContext)//desustruturando counter do useContext-CounterContext
  const {counter} = useCounterContext()//invocando a funcao do hook

  //5 - context mais completo
  const {color, dispatch} = useTitleColorContext()

  console.log(color)

  // 6 - alterando state complexo
const setTitleColor = (color) => {
  dispatch({ type: color })//tem um dispatch e a cor seria a acao
}

  return (
    <div> 
      <h1 style={{color:color}}>Home</h1>
      <p>Valor do contador: {counter}</p>
      {/* alterando valor contexto */}
      <ChangeCounter />
      {/* 6 - alterando contexto complexo */}
      <div>
      <button onClick={() => setTitleColor("RED")}>Vermelho</button>
      <button onClick={() => setTitleColor("BLUE")}>Azul</button>
      </div>
    </div>
  )
}

export default Home

