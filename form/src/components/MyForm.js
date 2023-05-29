import { useState } from 'react'
import './MyForm.css'

const MyForm = ({ user }) => {
  //6 - controlled inputs
  // 3 - gerenciamento de dados
  const [name, setName] = useState(user ? user.name : '')
  const [email, setEmail] = useState(user ? user.email : '')

  const handleName = (e) => {
    setName(e.target.value)
  }

  //console.log(name)
  //console.log(email )

  const handleSubmit = (e) => {
    e.preventDefault()
    //preventDefault - para o envio, form não recarrega a pág.
    console.log("Enviando form")
    console.log(name, email)
  }

  return (
    <div>
      {/* 5 - envio de form */}
      {/* 1 - criacao de form */}
      <form onSubmit={handleSubmit}>
        {/*onSubmit - pega evento de submissão do form*/}{/*handleSubmit - função para processar envio */}
        <div>
          <label htmlFor="name">Nome:</label>
          <input type="text" 
          name="name" 
          placeholder="Digite o seu nome" 
          onChange={handleName}
          value={name}
          />
        </div>
        {/* 2 - label envolvendo input */}
        <label>
          <span>Email</span>
          {/* 4 - simplificação de manipulação de state */}
          <input type="email" 
          name="email" 
          placeholder="Digite o seu email" 
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          />
        </label>
        <input type="submit" value="Enviar" />
      </form>
    </div>
  )
}

export default MyForm