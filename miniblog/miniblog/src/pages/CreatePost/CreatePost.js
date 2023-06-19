import styles from './CreatePost.module.css'

import { useState } from 'react'//manusear posts para serem salvos no banco
import { useNavigate } from 'react-router-dom'//redirecionar dps da criacao do post
import { useAuthValue } from '../../context/AuthContext'//para atrelar usuário no post, assim que será possível fzr dashboard

const CreatePost = () => {
  const [title, setTitle] = useState("")
  const [image, setImage] = useState("")
  const [body, setBody] = useState("")//seria o conteúdo do post
  const [tags, setTags] = useState([])//array pois tags são compostas por listas 
  const [formError, setFormError] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div className={styles.create_post}>
      <h2>Criar post</h2>
      <p>Escreva sobre o que quiser e compartilhe o seu conhecimento</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Título:</span>
          <input type="text" name='title' required placeholder='Pense num bom título...'
            onChange={(e) => setTitle(e.target.value)} value={title} />
        </label>
        <label>
          <span>URL da imagem:</span>
          <input type="text" name='image' required placeholder='Insira uma imagem que representa o seu post'
            onChange={(e) => setImage(e.target.value)} value={title} />
        </label>
        <label>
          <span>Conteúdo:</span>
          <textarea name="body" required placeholder='Insira o conteúdo do post'
            onChange={(e) => setBody(e.target.value)} value={body}>
            </textarea>
      </label>
      <label>
          <span>Tags:</span>
          <input type="text" name='tags' required placeholder='Insira as tags separadas por vírgula'
            onChange={(e) => setTags(e.target.value)} value={tags} />
        </label>
        <button className='btn'>Cadastrar</button>
        {/*{loading && <button className='btn' disabled>Aguarde...</button>}
        {error && <p className='error'>{error}</p>}*/}
      </form>
    </div >
  )
}

export default CreatePost