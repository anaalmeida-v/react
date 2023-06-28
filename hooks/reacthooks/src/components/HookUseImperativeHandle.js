//a sacada é um componente pai executar uma função no componente filho de forma imperativa

import { useRef } from "react";

import SomeComponent from "./SomeComponent"; //componente externo

const HookUseImperativeHandle = () => {
  const componentRef = useRef(); //referencia de um input

  return (
    <div>
      <h2>UseImperativeHandle</h2>
      <SomeComponent ref={componentRef} />
      {/*enviando referência como propriedade(funciona por conta do 'forwardRef') - componente referenciado*/}
      <button onClick={() => componentRef.current.validate()}>Validate</button>
      {/* validate precisa ser definida no componente filho por ser a referência desse input */}
      {/*o botão está basicamente executando uma função do componente(pelo fato do componente estar referenciado)-referência que foi passada por meio do forwardRef*/}
      <hr />
    </div>
  );
};
export default HookUseImperativeHandle;
