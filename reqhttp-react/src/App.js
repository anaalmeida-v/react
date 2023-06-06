import './App.css';

import { useState, useEffect } from 'react'
//useState - salvar dados em algum lugar
//useEffect - fazer requisição uma vez só, ou qnd necessário

const url = "http://localhost:3000/products"//url base para fazer requisição 


function App() {
  const [products, setProducts] = useState([])//para salvar dados
  //products - salva // setProducts - auxilia para colocar os produtos em algum lugar


  //1 - resgatando dados
  useEffect(() => {//requisição
    async function fetchData() {
      const res = await fetch(url)
      //res é usado geralmente, pois vem de resposta, response, estamos recebendo a requisição
      //como, essa resposta vem em json(texto puro), precisa ser transformada em objeto para poder ser feita a interação
      const data = await res.json()

      setProducts(data)
    }
    fetchData();
  }, [])

  console.log(products)

  return (
    <div className="App">
      <h1>Lista de produtos</h1>
    </div>
  );
}

export default App;
