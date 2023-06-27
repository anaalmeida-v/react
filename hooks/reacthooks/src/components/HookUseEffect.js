import { useEffect, useState } from "react";

const HookUseEffect = () => {
  // 1 - useEffect, sem dependências
  useEffect(() => {
    console.log("Sendo executado");
  });

  const [number, setNumber] = useState(10);

  const changeSomething = () => {
    setNumber(number+1)//somar uma unidade a cada vez
  }

  return (
    <div>
      <h2>useEffect</h2>
      <p>Number: {number}</p>
      <button onClick={changeSomething}>Executar!</button>
      <hr />
    </div>
  );
};

export default HookUseEffect;
