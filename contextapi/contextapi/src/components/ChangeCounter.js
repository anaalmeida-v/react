// 3 - alterando contexto
import { useContext } from 'react'
import { CounterContext } from '../context/CounterContext'

const ChangeCounter = () => {
    const {counter, setCounter} = useContext(CounterContext)//consumindo valor para alteração

  return (
    <div>
        <button onClick={() =>{setCounter(counter+1)}}>Add value to counter</button>{/* valor de contador é incrementado a cada vez que o botao é clicado */}
        {/* arrow function pois se uma funcao é colocada diretamente ela é executada ao renderizar o component */}
    </div>
  )
}

export default ChangeCounter