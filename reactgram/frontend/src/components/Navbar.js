import './Navbar.css'

//Components
import { NavLink, Link } from 'react-router-dom'
import { BsSearch, BsHouseDoorFill, BsFillPersonFill, BsFillCameraFill } from 'react-icons/bs' //icones

//Hooks
import { useState } from 'react'//gerenciar estados
import { useAuth } from '../hooks/useAuth'//para usar autenticação
import { useDispatch, useSelector } from 'react-redux'//para quando tivermos configs de logout por exemplo//para resgatar state do store do reducer
import { useNavigate } from 'react-router-dom'//redirecionar usuários

//Reducer
import { logout, reset } from '../slices/authSlice'

const Navbar = () => {
  const { auth } = useAuth()
  const { user } = useSelector((state) => state.auth)//pegando usuário state da autenticação

  const navigate = useNavigate()

  const dispatch = useDispatch()//enviar ou despachar uma ação para um "reducer" em uma arquitetura Flux ou Redux

  const handleLogout = () => {
    dispatch(logout())
    dispatch(reset())
    //não é necessário o useEffect pois é apenas uma função

    navigate("/login")//como o usuário será desconectado ele é redirecionado para login
  }

  return <nav id="nav">
    <Link to="/">ReactGram</Link>
    <form id="search-form"><BsSearch /><input type='text' placeholder='Pesquisar' /></form>
    <ul id='nav-links'>
      {auth ? (//se usuário tiver autenticado exibe um navlink com o ícone de home
        <>
          <li><NavLink to="/"><BsHouseDoorFill /></NavLink></li>
          {user && (//se usuário estiver logado exibe um navlink com um icone que encaminha para url /users/id-user
            <li><NavLink to={`/users/${user._id}`}><BsFillCameraFill /></NavLink></li>//página do usuário
          )}
          <li><NavLink to="/profile"><BsFillPersonFill /></NavLink></li>{/* perfil usuário logado */}
          <li><span onClick={handleLogout}>Sair</span></li>
        </>
      ) : (
        <>
          <li><NavLink to="/login">Entrar</NavLink></li>
          <li><NavLink to="/register">Cadastrar</NavLink></li>
        </>
      )}
    </ul>
  </nav>
}

export default Navbar