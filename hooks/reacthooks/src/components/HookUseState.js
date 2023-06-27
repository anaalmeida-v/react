import { useState } from "react";

const HookUseState = () => {
  // 1 - useState - utilizado quando há a necessidade de alterar um valor
  let userName = "João";

  const [name, setName] = useState("Matheus"); //matheus é o valor dado ao 'name'
  //inicialmente vem o nome da variável e um set com o nome da variável/ getter e setter
  //name - consulta(onde iremos obter o valor de state), setName - método onde há a alteração do valor do state

  const changeNames = () => {
    userName = "João Souza";
    setName("Matheus Battisti");
  };

  // 2 - useState e Input
  const [age, setAge] = useState(18);

  const handleSubmit = (e) => {
    /* como no onChange, no handleSubmit também têm-se o acesso ao evento(e)  */
    e.preventDefault(); //fazendo com que fluxo seja contínuo sem recarregamento de página

    //envio a uma API
    console.log(age);
  };

  return (
    <div>
      {/* 1 - useState */}
      <h2>useState</h2>
      <p>Variável: {userName}</p>
      <p>useState: {name}</p>
      <button onClick={changeNames}>Mudar nomes!</button>

      <hr />
      {/* 2 - useState e Input */}
      <p>Digite a sua idade: </p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        {/*value={age} - controlled inputs*/}
        {/*(e.target.value) - olha input atual{age}, pega o valor e coloca no state, fazendo a alteração dele baseada no onChange a cada mudança de valor*/}
        <input type="submit" value="Enviar" />
      </form>
      <p>Você tem {age} anos!</p>
    </div>
  );
};

export default HookUseState;
