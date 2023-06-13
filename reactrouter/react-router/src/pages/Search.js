import { useSearchParams, Link } from 'react-router-dom'
import { useFetch } from 'react-router-dom'//hook para importação de dados

const Search = () => {
  const [searchParams] = useSearchParams()

  const url = "http://localhost:3000/products?" + searchParams

  const { data: item, loading, error} = useFetch(url)

  return (
    <div>
      <h1>Resultados disponíveis</h1>
        <ul className='products'>
          {items && items.map((item) => (
            <li key={item.id}>
              <h2>{item.name}</h2>
              <p>{item.price}</p>
              <Link to={`/products/${item.id}`}>Detalhes</Link>
            </li>
          ))}
        </ul> 
    </div>
  )
}

export default Search