import { useEffect, useState, useRef } from "react";

const HookUseRef = () => {
  //1 - useRef
  const numberRef = useRef(0);
  const [counter, setCounter] = useState(0);
  const [counterB, setCounterB] = useState(0);

  useEffect(()=>{
    numberRef.current = numberRef.current + 1
  })//caso não fosse um Ref o component estaria em um loop infinito

  return (
    <div>
      <h2>useRef</h2>
      <p>O componente rederizou: {numberRef.current} vezes.</p>
      <p>Counter: {counter}</p>
      <button onClick={() => setCounter(counter + 1)}>Contador A: {counter}</button>
      <p>Counter: {counterB}</p>
      <button onClick={() => setCounterB(counterB + 1)}>Contador B: {counterB}</button>
    </div>
  );
};

export default HookUseRef;
