import { forwardRef, useRef, useImperativeHandle } from "react";

const SomeComponent = forwardRef((props, ref) => {
  //referência precisa ser envolvida no 'forwardRef'//agr existe o acesso ao 'prop' e ao 'ref'
  //a 'ref' está sendo enviada para um input
  const localInputRef = useRef();

  useImperativeHandle(ref, () => {
    //ref disponibiliza função para o componente pai
    return {
      validate: () => {
        if (localInputRef.current.value.length > 3) {
          //check n/caracteres>3
          localInputRef.current.value = ""; //check-verdadeiro: input vazio
        }
      },
    }; //retorno do que poderá ser utilizado no componente pai
  });

  return (
    <div>
      <p>Insira no máximo 3 caracteres</p>
      <input type="text" ref={localInputRef} />
      {/* input a ser validado a partir do componente pai */}
    </div>
  );
});

export default SomeComponent;
