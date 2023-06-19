import styles from './Login.module.css'
import { useEffect, useState } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login, error: authError, loading} = useAuthentication()

  useEffect(() => {
    if(authError) {
       setError(authError)
    }

  }, [authError])

  //renomeando erro, assim nao fica confuso pois já existe o do front-end
  const handleSubmit = async (e) => {//o submit serve para reunir todos os dados e ajudar na hora de enviar no formulário
    e.preventDefault();
    


    setError("")

    //validação de senha
    const user = {
      email,
      password
    }

    const res = await login(user)

    console.log(user)

    
  }
  return (
    <div className={styles.login}>
      <h1>Entrar</h1>
      <p>Faça o login para poder utilizar o sistema</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>E-mail:</span>
          <input type="email" name='email' required placeholder='Email do usuário'
            value={email}
            onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          <span>Senha:</span>
          <input type="password" name='password' required placeholder='Senha do usuário'
            value={password}
            onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button className='btn'>Entrar</button>
        {loading && <button className='btn' disabled>Aguarde...</button>}
        {error && <p className='error'>{error}</p>}
      </form>
    </div>
  )
}

export default Login