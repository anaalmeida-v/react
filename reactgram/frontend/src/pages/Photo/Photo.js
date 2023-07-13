import './Photo.css'

import { uploads } from '../../utils/config'//onde contém as imagens

//components
import Message from '../../components/Message'
import PhotoItem from '../../components/PhotoItem'
import { Link } from 'react-router-dom'

//hooks
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

//redux
import { getPhoto } from '../../slices/photoSlice'

const Photo = () => {
    const { id } = useParams()

    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)//usuário autenticado
    const { photo, loading, error, message } = useSelector((state) => state.photo);//dados do state da photo

    //coments

    //load photo data - carregar dados da foto
    useEffect(() => {
        dispatch(getPhoto(id))
    }, [dispatch, id])//entrando na página a foto já estará sendo carregada 

    //like and comment
    if (loading) {
        return <p>Carregando...</p>
    }

    return (
        <div id='photo'>
            <PhotoItem photo={photo} />
        </div>
    )
}

export default Photo