import { useState, useEffect, useMemo } from "react";
//useMemo é parecido com use Callback, mas, o useCallback é para funções e useMemo para números

const HookUseMemo = () => {
  const [number, setNumber] = useState(0);

  //const premiumNumbers = ["0", "100", "200"]

  const premiumNumbers = useMemo(() => {
    return ["0", "100", "200"];
  }, []);

  useEffect(() => {
    console.log("Premium numbers foi alterado!");
  }, [premiumNumbers]);

  return (
    <div>
      <h2>UseMemo</h2>
      <input type="text" onChange={(e) => setNumber(e.target.value)} />
      {premiumNumbers.includes(number) ? <p>Acertou o número</p> : ""}
      {/* se incluir o numero "premiumNumbers.includes(number)", será exibido o parágrafo se não, não imprime nada*/}

      <hr />
    </div>
  );
};

export default HookUseMemo;
