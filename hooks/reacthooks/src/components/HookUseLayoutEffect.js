import { useLayoutEffect, useEffect, useState } from "react";
//usado em situações bem específicas que precisa exibir algo antes da renderização do componente

const HookUseEffectLayout = () => {
  const [name, setName] = useState("Algum nome");

  useEffect(() => {
    console.log("2");
    setName("Mudou de novo!");
  }, []);

  //useLayoutEffect é sempre invocado primeiro, antes de iniciar qlqr coisa no componente
  //esse componente inicia com um useEffect, mas quem está sendo exibido primeiro é o useLayoutEffect
  useLayoutEffect(() => {
    console.log("1");
    setName("Outro nome");
  }, []);

  console.log(name);

  return (
    <div>
      <h2>useEffectLayout</h2>
      <p>Nome: {name}</p>
      <hr />
    </div>
  );
};

export default HookUseEffectLayout;
