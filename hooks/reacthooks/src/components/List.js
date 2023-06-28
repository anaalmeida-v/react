import { useState, useEffect } from "react";

const List = ({ getItems }) => {
  const [myItems, setMyItems] = useState([]);

  useEffect(() => {
    
    console.log("Buscando itens do DB...")

    setMyItems(getItems);
  }, [getItems]); //quando getItem for alterado, valor de setMyItems será atualizado para o valor de getItems

  return <div>
    { myItems && myItems.map((item)=>(
      <p key={item}>{item}</p>
    ))}
  </div>;
};

export default List;
