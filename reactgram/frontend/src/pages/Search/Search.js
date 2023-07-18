import './Search.css'

//hooks
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useResetComponentMessage } from '../../hooks/useResetComponentMessage'
import { useQuery } from '../../hooks/useQuery'

//components
import LikeContainer from '../../components/LikeContainer'
import PhotoItem from '../../components/PhotoItem'
import { Link } from 'react-router-dom'

//redux
import { searchPhotos, like } from '../../slices/photoSlice'

const Search = () => {
    const query = useQuery()
    const search = query.get("q")//a pesquisa em si fica nesse elemento

    const dispatch = useDispatch()

    const resetMessage = useResetComponentMessage(dispatch)//reseta mensagem

    const { user } = useSelector(state => state.auth)//usuário autenticado
    const { photos, loading } = useSelector(state => state.photo)//photos do state

    //load photos - fotos baseadas na busca
    useEffect(() => {

        dispatch(searchPhotos(search))

    }, [dispatch, search])//função depende do dispatch e do que vem na variável search

    //like a photo - função de like
    const handleLike = (photo) => {//inicializando foto nos argumentos
        dispatch(like(photo._id))//resgatando funcao de like e id da foto

        resetMessage()//limpar msg de sucesso
    }

    if (loading) {
        <p>Carregando...    </p>
    }

    return (
        <div id='search'>
            <h2>Você está buscando por: {search}</h2>
            {photos && photos.map((photo) => (
                <div key={photo._id}>{/* id da photo */}
                    <PhotoItem photo={photo} />
                    <LikeContainer photo={photo} user={user} handleLike={handleLike} />
                    <Link className="btn" to={`/photos/${photo._id}`}>Ver mais</Link>
                </div>
            ))}
            {photos && photos.length === 0 && (
            <h2 className="no-photos">
                Não foram encontrados resultados para a sua busca...    
            </h2>
        )}
        </div>
    )
}

export default Search