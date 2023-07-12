import "./Profile.css"

import { uploads } from "../../utils/config"

// components
import Message from "../../components/Message"
import { Link } from "react-router-dom"
import { BsFillEyeFill, BsPencilFill, BsXLg } from "react-icons/bs"

// hooks
import { useEffect, useState, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"

// Redux
import { getUserDetails } from "../../slices/userSlice"
import { publishPhoto, resetMessage, getUserPhotos } from '../../slices/photoSlice'

const Profile = () => {
  const { id } = useParams()//id da url de quando um usuário entra no perfil de outro

  const dispatch = useDispatch()//do hook do redux, para usar por exemplo, função de chamar dados

  const { user, loading } = useSelector((state) => state.user)//usuário que outra pessoa entrou no perfil
  const { user: userAuth } = useSelector((state) => state.auth)//usuário autenticado
  const { photos, loading: loadingPhoto, message: messagePhoto, error: errorPhoto } = useSelector((state) => state.photo)//seleciona estados da photo
  //renomeando porque funções já existem

  const [title, setTitle] = useState("")
  const [image, setImage] = useState("")

  // new form and edit form refs - novo formulário e editar refs de formulário
  const newPhotoForm = useRef()
  const editPhotoForm = useRef()

  //load user data - carregar dados do usuário
  useEffect(() => {
    dispatch(getUserDetails(id))//detalhes e id do usuário
    dispatch(getUserPhotos(id))
  }, [dispatch, id])

  const handleFile = (e) => {//setar valores de imagem
    //image preview
    const image = e.target.files[0];

    setImage(image);
  }

  const submitHandle = (e) => {
    e.preventDefault()//previnindo evento de envio de formulário

    const photoData = {
      title,
      image
    }//dados da foto

    //build form data - construir dados de formulário
    const formData = new FormData()

    const photoFormData = Object.keys(photoData).forEach((key) => formData.append(key, photoData[key]))//Object.keys()-loop em todas as chaves do objeto
    //.forEach - executa uma função fornecida uma vez para cada elemento do array/.append - coloca novo valor no final dos valores existente.

    formData.append("photo", photoFormData)

    dispatch(publishPhoto(formData))

    setTitle("")

    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  }

  if (loading) {
    return <p>Carregando...</p>
  }

  return (
    <div id="profile">
      <div className="profile-header">
        {user.profileImage && (//image check
          <img src={`${uploads}/users/${user.profileImage}`} alt={user.name} />//image display - exibição da imagem
        )}
        <div className="profile-description">{/* image description */}
          <h2>{user.name}</h2>
          <p>{user.bio}</p>
        </div>
      </div>
      {id === userAuth._id && (//verificando se id da url é igual ao do id do usuário autenticado
        <>{/* se for, aparecerá um form para usuário fazer uma nova postagem */}
          <div className="new-photo" ref={newPhotoForm}>
            <h3>Compartilhe algum momento seu:</h3>
            <form onSubmit={submitHandle}>
              <label>
                <span>Título para a foto</span>
                <input type="text" placeholder="Insira um título" onChange={(e) => setTitle(e.target.value)} value={title || ""} />
              </label>
              <label>
                <span>Imagem: </span>
                <input type="file" onChange={handleFile} />
              </label>
              {!loadingPhoto && <input type="submit" value="Postar" />}
              {loadingPhoto && <input type="submit" disabled value="Aguarde..." />}
            </form>
          </div>
          {errorPhoto && <Message msg={errorPhoto} type={"error"} />}
          {messagePhoto && <Message msg={messagePhoto} type={"success"} />}
        </>
      )}
      <div className="user-photos">
        <h2>Fotos publicadas:</h2>
        <div className="photos-container">
          {photos && photos.map((photo) => (//se fotos existirem, são mapeadas e cada uma é nomeada como "photo"
            <div className="photo" key={photo._id}>
              {photo.image && (<img src={`${uploads}/photos/${photo.image}`} alt={photo.titl} />)}{/* verificando se photo chegou, se sim, exibe imagem*/}
              {id === userAuth._id ? (
                <p>actions</p>
              ) : (<Link className="btn" to={`/photos/${photo._id}`}>Ver</Link>)}
            </div>
          ))}
          {photos.length === 0 && <p>Ainda não há fotos publicadas</p>}
        </div>
      </div>
    </div>
  )
}

export default Profile