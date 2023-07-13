import './Photo.css'

import { uploads } from '../../utils/config'//onde contém as imagens

//components
import Message from '../../components/Message'
import PhotoItem from '../../components/PhotoItem'
import LikeContainer from '../../components/LikeContainer'
import { Link } from 'react-router-dom'

//hooks
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useResetComponentMessage } from '../../hooks/useResetComponentMessage'

//redux
import { getPhoto, like } from '../../slices/photoSlice'

const Photo = () => {
    const { id } = useParams()

    const dispatch = useDispatch()

    const resetMessage = useResetComponentMessage(dispatch)

    const { user } = useSelector((state) => state.auth)//usuário autenticado
    const { photo, loading, error, message } = useSelector((state) => state.photo);//dados do state da photo

    //coments

    //load photo data - carregar dados da foto
    useEffect(() => {
        dispatch(getPhoto(id))
    }, [dispatch, id])//entrando na página a foto já estará sendo carregada 

    const handleLike = () => {
        dispatch(like(photo._id))

        resetMessage()
    }

    if (loading) {
        return <p>Carregando...</p>
    }

    return (
        <div id='photo'>
            <PhotoItem photo={photo} />
            <LikeContainer photo={photo} user={user} handleLike={handleLike} />
            <div className='message-container'>
            {error && <Message msg={error} type="error" />}
            {message && <Message msg={message} type="success" />}
            </div>
        </div>
    )
}

export default Photo