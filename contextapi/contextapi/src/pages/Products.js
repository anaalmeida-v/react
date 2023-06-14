//import { useContext } from 'react'
//import { CounterContext } from '../context/CounterContext'

import { useCounterContext } from "../hooks/useCounterContext"//importando hook que contem o context

const Products = () => {
  const { counter } = useCounterContext()

  return (
    <div>
      <h1>Products</h1>
      <p>Valor do contador: {counter}</p>
    </div>
  )
}

export default Products