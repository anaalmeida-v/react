import { useReducer } from "react";

const HookUseReducer = () => {
  // 1 - começando com o useReducer
  const [number, dispatch] = useReducer((state, action) => {
  //nome da variável//nome que geralmente chamado de dispatch é onde executaremos a função para alterar aquele valor dinâmico
  //state - number(nome da variável)
  
    return Math.random(state)//pega valor inicial do state e coloca ele para um número aleaório
  });

  return (
    <div>
      <h2>useReducer</h2>
      <p>Número: {number}</p>
      <button onClick={dispatch}>Alterar número!</button>
      <hr />
    </div>
  );
};

export default HookUseReducer;
