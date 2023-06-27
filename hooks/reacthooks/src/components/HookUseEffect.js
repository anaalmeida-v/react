import { useEffect, useState } from "react";

const HookUseEffect = () => {
  // 1 - useEffect, sem dependências
  useEffect(() => {
    console.log("Sendo executado");
  });

  const [number, setNumber] = useState(10);

  const changeSomething = () => {
    setNumber(number + 1); //somar uma unidade a cada vez
  };

  // 2 - array de dpend. vazio
  useEffect(() => {
    console.log("Executado apenas uma vez");
  }, []);

  //3 - item no array de dependências
  const [anotherNumber, setAnotherNumber] = useState(0);

  useEffect(() => {
    if (anotherNumber > 0) {
      console.log("Sou executado apenas quando anotherNumber muda!");
    }
  }, [anotherNumber]);

  // 4 - cleanup do useEffect
  useEffect(() => {
    //const timer = setTimeout(() => {
    //  console.log("Hello Word");
    //
    //  setAnotherNumber(anotherNumber + 1)
    //}, 2000);
    //return () => clearTimeout(timer)
  }, [anotherNumber]); //pode haver 2 useEffects referenciando o mesmo valor

  return (
    <div>
      <h2>useEffect</h2>
      <p>Number: {number}</p>
      <button onClick={changeSomething}>Executar!</button>
      <p>Another Number: {anotherNumber}</p>
      <button onClick={() => setAnotherNumber(anotherNumber + 1)}>
        Mudar anotherNumber!
      </button>
      <hr />
    </div>
  );
};

export default HookUseEffect;
