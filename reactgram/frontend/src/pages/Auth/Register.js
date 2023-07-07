import "./Auth.css"

// Components
import { Link } from "react-router-dom"
import Message from "../../components/Message"

// Hooks
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

// Redux
import { register, reset } from "../../slices/authSlice"

const Register = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const dispatch = useDispatch()//nos permite utilizar as funções reducer

  const { loading, error } = useSelector((state) => state.auth)//nos permite escolher qual estado e de qual reducer estou usando

  const handleSubmit = (e) => {
    e.preventDefault()//previnindo evento de envio de formulário

    const user = {
      name,
      email,
      password,
      confirmPassword,
    }

    console.log(user)
    dispatch(register(user))
  }


  //Clean all auth states - limpar todos so states de autenticação(resetar tudo)
  useEffect(() => {
    dispatch(reset())
  }, [dispatch])//fazer um useEffect sempre que rola um dispatch faz com que seja possível disparar o reset, assim o reset fica automatizado antes de disparar qualquer função que dispara uma função async

  return (
    <div id="register">
      <h2>ReactGram</h2>
      <p className="subtitle">Cadastre-se para ver as fotos dos seus amigos.</p>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nome" onChange={(e) => setName(e.target.value)} value={name} />
        <input type="email" placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} value={email} />
        <input type="password" placeholder="Senha" onChange={(e) => setPassword(e.target.value)} value={password} />
        <input type="password" placeholder="Confirme a senha" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} />
        {!loading && <input type="submit" value="Cadastrar" />}
        {loading && <input type="submit" disabled value="Aguarde..." />}
        {error && <Message msg={error} type="error" />}
      </form>
      <p>Já tem conta? <Link to="/login">Clique aqui</Link></p>
    </div>
  )
}

export default Register