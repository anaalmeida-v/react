import { useSearchParams, Link} from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'//hook para importação de dados

const Search = () => {
  let [searchParams] = useSearchParams()

  const url = "http://localhost:3000/products?" + searchParams

  const { data: items, loading, error} = useFetch(url)

  return (
    <div>
      <h1>Resultados disponíveis</h1>
      {error && <p>Erro!!</p>}
        <ul className='products'>
          {items && items.map((item) => (
            <li key={item.id}>
              <h2>{item.name}</h2>
              <p>{item.price}</p>
              <Link to={`/products/${item.id}`}>Detalhes</Link>
            </li>
          ))}
        </ul> 
        {loading && <p>Carregando...</p>}
    </div>
  )
}

export default Search