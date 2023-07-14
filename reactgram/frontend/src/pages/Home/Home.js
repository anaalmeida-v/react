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
    const resetMessage = useResetComponentMessage()//reset de mensagem
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
        <div>Home</div>
    )
}

export default Home 