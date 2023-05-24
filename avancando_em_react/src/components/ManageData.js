import { useState } from "react";

const ManageData = () => {
  const someData = 10;

  const [number, setNumber] = useState(15);

  console.log(number)
  return (
    <div>
      <div>
        <p>Valor: {someData}</p>
        <button onClick={() => (someData = 15)}>Mudar variável</button>
      </div>
      <div>
        <p>Valor: {number}</p>
        <button onClick={() => number(20)}>Mudar state</button>
      </div>
    </div>
  );
};

export default ManageData;