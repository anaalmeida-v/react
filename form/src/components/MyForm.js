import './MyForm.css'

const MyForm = () => {
  return (
    <div>
        {/* 1 - criacao de form */}
        <form>
            <div>
                <label htmlFor="name">Nome:</label>
                <input type="text" name="name" placeholder="Digite o seu nome" />
            </div>
            {/* 2 - label envolvendo input */}
            <label>
              <span>Email</span>
              <input type="email" name="email" placeholder="Digite o seu email" />
            </label>
            <input type="submit" value="Enviar" />
        </form>
    </div>
  )
}

export default MyForm