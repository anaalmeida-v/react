import { Link } from 'react-router-dom'
import { useFetch } from "../hooks/useFetch"

import "./Home.css"

const Home = () => {
  //3 - carregamento de dados
  const url = "http://localhost:3000/products"

  const { data: items, loading, error } = useFetch(url)
  //chamando propriedados vindas do hook //data - dados
  //console.log({ data: items, loading, error })
  //console.log(url)
  return (
    <div>
      <h1>Produtos</h1>
      {error && <p>{error}</p>}{/* se houver erro, será imprimido o mesmo */}
      {loading && <p>Carregando...</p>}
      <ul className='products'>
        {items && items.map((item) => (//checando se itens chegaram, se sim, será feito um .map em cada item(esse .map chama-se 'item')
          <li key={item.id}>
            <h2>{item.name}</h2>
            <p>R$: {item.price}</p>
            {/* 4 - rota dinâmica */}
            <Link to={`/products/${item.id}`}>Detalhes</Link>{/* um link q leva aos detalhes do produto */}
            {/* link para item dinamico(por isso fica entre chaves) */}
          </li>

        ))}

      </ul>
    </div>
  )
  //console.log(items.map)
}

export default Home