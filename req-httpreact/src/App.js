import './App.css';

import { useState, useEffect } from 'react';

const url = "http://localhost:3000/products"

function App() {

  const[products, setProducts] = useState([])

  //1 - resgatando dados
  useEffect(async() => {

    const res = await
    //res é usado geralmente, pois vem de resposta, response, estamos recebendo a requisição

  })

  return (
    <div className="App">
      <h1>Lista de produtos</h1>
    </div>
  );
}

export default App;
