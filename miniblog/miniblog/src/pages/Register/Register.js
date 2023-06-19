import styles from "./Register.module.css";

import { useEffect, useState } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";

const Register = () => {
  const [displayName, setDisplayName] = useState("");//nome do usuario
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const { createUser, error: authError, loading } = useAuthentication();

  
  //renomeando erro, assim nao fica confuso pois já existe o do front-end

  const handleSubmit = async (e) => {//o submit serve para reunir todos os dados e ajudar na hora de enviar no formulário
    e.preventDefault();


    setError("")

    //validação de senha
    const user = {
      displayName,
      email,
      password
    }

    if (password !== confirmPassword) {
      setError("As senhas precisam ser iguais!")
      return
    }

    const res = await createUser(user)

    console.log(user)
  }

  return (
    <div className={styles.register}>
      <h1>Cadastre-se para postar</h1>
      <p>Crie seu usuário e compartilhe suas histórias</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Nome:</span>
          <input type="text" name='displayName' required placeholder='Nome do usuário'
            value={displayName}//para que fique com controle de inputs
            onChange={(e) => setDisplayName(e.target.value)} />{/* preencher o valor dos views dos states */}
        </label>
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
        <label>
          <span>Confirmação de senha:</span>
          <input type="password" name='confirmPassword' required placeholder='Confirme a sua senha'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)} />
        </label>
        <button className='btn'>Cadastrar</button>
        {loading && <button className='btn' disabled>Aguarde...</button>}
        {error && <p className='error'>{error}</p>}
      </form>
    </div>
  )
}

export default Register