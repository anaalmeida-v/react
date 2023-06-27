import {useState} from 'react'

const HookUseState = () => {
  // 1 - useState - utilizado quando há a necessidade de alterar um valor 
  let userName = "João"

  const [name, setName] = useState("Matheus")//matheus é o valor dado ao 'name'
  //inicialmente vem o nome da variável e um set com o nome da variável/ getter e setter
  //name - consulta(onde iremos obter o valor de state), setName - método onde há a alteração do valor do state

  const changeNames = () => {

    userName = "João Souza"
    setName("Matheus Battisti")
  }

  return (
    <div>
      {/* 1 - useState */}
      <h2>useState</h2>
      <p>Variável: {userName}</p>
      <p>useState: {name}</p>
      <button onClick={changeNames}>Mudar nomes!</button>

      <hr /> 
    </div>
  )
}

export default HookUseState