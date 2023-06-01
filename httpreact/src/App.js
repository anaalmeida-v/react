import './App.css';

import { useState, useEffect } from 'react';

const url = "http://locahost:3000/products"

function App() {
  const [products, setProducts] = useState([])

  //1 - resgatando dados
  useEffect(async () => {

    async function fetchData() {
      const res = await fetch(url)

      const data = await res.json()

      setProducts(data)

    }

    fetchData()

  }, [])

  return (
    <div className="App">
      <h1>Lista de produtos</h1>
    </div>
  );
}

export default App;
