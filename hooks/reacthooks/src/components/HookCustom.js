import { useState } from "react";
import { usePrevious } from "../hooks/usePrevious";//chamada do hook

const HookCustom = () => {
  const [number, setNumber] = useState(0); //componente é re-renderizado, começará a valer 0
  const previousValue = usePrevious(number); //valor antigo é passado

  return (
    <div>
      <h2>Custom Hook</h2>
      <p>Atual: {number}</p>
      <p>Anterior: {previousValue}</p>{/* número salvo no hook */}
      <button onClick={() => setNumber(Math.random())}>Alterar!</button>{/* quando botão é clicado, o setNumber recebe números aleatórios 'Math.random()' */}
      <hr />
    </div>
  );
};

export default HookCustom;