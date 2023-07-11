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

const Profile = () => {
  const { id } = useParams()//id da url de quando um usuário entra no perfil de outro

  const dispatch = useDispatch()//do hook do redux, para usar por exemplo, função de chamar dados

  const { user, loading } = useSelector((state) => state.user)//usuário que outra pessoa entrou no perfil
  const { user: userAuth } = useSelector((state) => state.auth)//usuário autenticado

  //photo

  //load user data - carregar dados do usuário
  useEffect(() => {

    dispatch(getUserDetails(id))//detalhes e id do usuário
  }, [dispatch, id])

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
    </div>
  )
}

export default Profile