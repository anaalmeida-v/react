/*import { useContext } from 'react'
import { CounterContext } from '../context/CounterContext'*/

import { useCounterContext } from "../hooks/useCounterContext"

import { useTitleColorContext } from "../hooks/useTitleColorContext"

const About = () => {
  const { counter } = useCounterContext()

  //5 - context mais completo
  const {color} = useTitleColorContext()

  return (
    <div>
      <h1 style={{color:color}}>About</h1>{/* consumindo context que foi consumido inicialmente na home */}
      <p>Valor do contador: {counter}</p>
    </div>
  )
}

export default About