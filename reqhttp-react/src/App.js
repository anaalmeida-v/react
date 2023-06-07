import './App.css';

import { useState, useEffect } from 'react'
//useState - salvar dados em algum lugar
//useEffect - fazer requisição uma vez só, ou qnd necessário


// 4 - custom hook
import { useFetch } from "./hooks/useFetch";

// 8 - errar url para mostrar erro
// "http://localhost:3001/products"
const url = "http://localhost:3000/products"//url base para fazer requisição 


function App() {
  const [products, setProducts] = useState([])//para salvar dados
  //products - salva // setProducts - auxilia para colocar os produtos em algum lugar

  // 4 - custom hook e 5 - refactor post
  const { data: items, httpConfig, loading, error } = useFetch(url);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  //1 - resgatando dados
  /* useEffect(() => {//requisição
     async function fetchData() {
       const res = await fetch(url)
       //res é usado geralmente, pois vem de resposta, response, estamos recebendo a requisição
       //como, essa resposta vem em json(texto puro), precisa ser transformada em objeto para poder ser feita a interação
       const data = await res.json()
  */
  //   fetchData(data);
  // }, []);

  // 2 - add product
  const handleSubmit = async (e) => { //funcao handleSubmit recebe um evento e retorna a funcao
    e.preventDefault()// para nao submter o formulario()tradicional

    const product = {
      name,//qnd states tem o mesmo nome da chave, pode-se resumir, que se irão se igualar as variáveis criadas
      price,
    }//dados desse objeto serao enviados para backen

    // const res = await fetch("http://localhost:3000/products", {
    //   method: "POST",//como requisicao ja era get utiliza-se algo diferente, nesse caso, POST
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(product),//dado ja existe, porém precisa ser enviado como json, aquii esta havendo a transformacao dele para json
    // });

    // const addedProduct = await res.json();

    // 3 - carregamento dinâmico
    // setProducts((prevProducts) => [...prevProducts, addedProduct]);

    // 5 - refatorar post
    httpConfig(product, "POST");

    setName("");
    setPrice("");
  };

  /* 9 - desafio */
  const handleRemove = (id) => {
    httpConfig(id, "DELETE");
  };

  return (
    <div className="App">
      <h1>Lista de produtos</h1>
      {/* 6 - state de loading */}
      {loading && <p>Carregando dados...</p>}
      {error && <p>{error}</p>}
      <ul>
        {items &&
          items.map((product) => (//exibindo dados na tela
            <li key={product.id}>
              {product.name} - R$: {product.price}
              {/* 9 - desafio */}
              <button onClick={() => handleRemove(product.id)}>Excluir</button>
            </li>
          ))}
      </ul>

      <div className="add-product">
        <p>Adicionar produto:</p>
        <form onSubmit={handleSubmit}>{/* onSubmit recebe funcao handle submit */}
          <label>
            Nome:
            <input
              type="text"
              value={name}//ligando input ao state
              name="name"
              onChange={(e) => setName(e.target.value)}
            //onChange faz a manipulação de dado ligando o evento de digitar e extraindo o valor de input até esse evento
            />
          </label>
          <label>
            Preço:
            <input
              type="number"
              value={price}
              name="price"
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
          {/* 7 - state de loading no post */}
          {loading ? <p>Aguarde!</p> : <input type="submit" value="Criar" />}
        </form>
      </div>
    </div>
  );
}

export default App;