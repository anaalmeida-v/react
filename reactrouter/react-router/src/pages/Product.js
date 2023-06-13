import { useParams } from "react-router-dom"
import { useFetch } from "../hooks/useFetch"

const Product = () => {
  //4 - rota dinamica
  const {id} = useParams()

  //5 - carregamento dado individual
  const url = "http://localhost:3000/products/" + id

  const { data: product, loading, error } = useFetch(url)//dados vao vir do useFetch dentro de hooks trazendo uma url

  console.log(product)
  return (
    <>
    <p>ID do produto: {id}</p>{/* descricao aparecerá na tela de descricao no do produto, parte dinamica feita na Home.js e vinculada com o id e o useParams */}
    {error && <p>Ocorreu um erro</p>}{/* <- validação */}
    {loading && <p>Carregando...</p>}{/* <- validação */}
    {product && (
      <div>
        <h1>{product.name}</h1>
        <p>R${product.price}</p>
      </div>//exibindo dados do produto
    )}
    </>
  )
}

export default Product