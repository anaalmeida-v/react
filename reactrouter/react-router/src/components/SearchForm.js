import { useNavigate } from 'react-router-dom'//para redirecionar usuário dentro do código do componente

import {useState} from 'react'//estado do input

const SearchForms = () => {
  const navigate = useNavigate()
  const [query, setQuery] = useState()//busca//manipular estado e utilizar o valor dele para pegar a busca

  const handleSubmit =(e) => {
      e.preventDefault()//para página nao ser recarregada qnd botao de submit for clicado 

      navigate('/search?q=' + query)//busca
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" onChange={(e)=> setQuery(e.target.value)} />
      <input type="submit" value="Buscar" />
    </form>
  )
}

export default SearchForms