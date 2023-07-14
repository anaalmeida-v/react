import "./Home.css"

//components
import LikeContainer from '../../components/LikeContainer'//like
import PhotoItem from '../../components/PhotoItem'//photo individualmente
import { Link } from 'react-router-dom'

//hooks
import { useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { useResetComponentMessage } from '../../hooks/useResetComponentMessage'

//redux
import { getPhotos, like } from "../../slices/photoSlice"

const Home = () => {

    const dispatch = useDispatch()
    const resetMessage = useResetComponentMessage(dispatch)//reset de mensagem
    const { user } = useSelector((state) => state.auth)//usuário autenticado
    const { photos, loading } = useSelector((state) => state.photo)//states das fotos

    //load all photos - carregar todas as fotos
    useEffect(() => {
        dispatch(getPhotos())
    }, [dispatch])

    //like a photo - função de like
    const handleLike = (photo) => {//inicializando foto nos argumentos
        dispatch(like(photo._id))//resgatando funcao de like e id da foto

        resetMessage()//limpar msg de sucesso
    }

    if (loading) {
        <p>Carregando...    </p>
    }

    return (
        <div id="home">
            {photos && photos.map((photo) => (//se fotos existem é executado um .map nomeando cada foto individualmente como 'photo'
                <div key={photo._id}>{/* id da photo */}
                    <PhotoItem photo={photo} />
                    <LikeContainer photo={photo} user={user} handleLike={handleLike} />
                    <Link className="btn" to={`/photos/${photo._id}`}>Ver mais</Link>
                </div>
            ))}
            {photos && photos.length === 0 && (
                <h2 className="no-photos">
                    Ainda não há fotos publicadas, <Link to={`/users/${user._id}`}>clique aqui</Link> para começar{/*quando não houver fotos publicadas, usuário receberá um link para o seu perfil, para assim fazer a primeira postagem do sistema*/}
                </h2>
            )}
        </div>
    )
}

export default Home 