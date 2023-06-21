import styles from './Search.module.css'

//hooks
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import { useQuery } from '../../hooks/useQuery'//esse hook serve para pegar parâmetros da URL de uma forma mais profissional, onde 
//estamos separando funcionalidades do sistema

//components
import PostDetails from '../../components/PostDetails'
import { Link } from 'react-router-dom'


const Search = () => {
    const query = useQuery()//buscando parâmetro de useQuery()
    const search = query.get("q")//esse método get vem de URLSearchParams(obj javascript)
    //'q' foi definido no if de (query) em home

    const { documents: posts } = useFetchDocuments("posts", search)//resgatando search por ser aonde está sendo feita a busca

    return (
        <div className={styles.search_container}>
            <h2>Search</h2>
            {posts && posts.length === 0 && (//se não há resultados(vem vazio), exiba:
                <div className={styles.noposts}>
                    <p>Não foram encontrados posts a partir da sua busca...</p>
                    <Link to="/" className='btn btn-dark'>Voltar</Link>
                </div>
            )}
            {posts && posts.map((post) =>
                <PostDetails key={post.id} post={post}></PostDetails>
            )}
        </div>
    )
}

export default Search