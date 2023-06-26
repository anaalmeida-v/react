import styles from './EditPost.module.css'

import { useEffect, useState } from 'react'//manusear posts para serem salvos no banco
import { useNavigate, useParams } from 'react-router-dom'//redirecionar dps da criacao do post
import { useAuthValue } from '../../context/AuthContext'//para atrelar usuário no post, assim que será possível fzr dashboard
import { useFetchDocument } from '../../hooks/useFetchDocument'
import { useUpdateDocument } from '../../hooks/useUpdateDocument'

const EditPost = () => {
    const { id } = useParams()//se useParams retornar dados que vieram da URL, vai pegar o id
    const { document: post } = useFetchDocument("posts", id)

    const [title, setTitle] = useState("")
    const [image, setImage] = useState("")
    const [body, setBody] = useState("")//seria o conteúdo do post
    const [tags, setTags] = useState([])//array pois tags são compostas por listas 
    const [formError, setFormError] = useState("")

    useEffect(() => {//informações de post sendo exibida:

        if (post) {//quando ver que post chegou, exibe:
            setTitle(post.title)
            setBody(post.body)
            setImage(post.image)

            const textTags = post.tagsArray.join(", ")//transformando tag em string novamente
            
            setTags(textTags)//exibindo tags
        }

    }, [post])

    const { user } = useAuthValue()//chamando usuario

    const { updateDocument, response } = useUpdateDocument("posts")

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        setFormError("")//zerar erros form

        //validar url da imagem
        try {
            new URL(image)//tenta criar url com o dado'image'
        } catch (error) {
            setFormError("A imagem precisa ser uma URL!")
        }

        //criar array de tags
        const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase())
        /*esta sendo passado um .split() por todas as vírgulas, gerando um array. Em seguida algumas
        modificações acontecerão nas tags que são geradas baseada naquele array
        .trim() - remove os espaços em branco
        toLowerCase() - para buscas serem feitas mais facilmente*/

        //checar todos os valores
        if (!title || !tags || !image || !body) {
            setFormError("Por favor, preencha todos os campos ")
        }//se valores nao forem retornados sera exibida uma mensagem de erro

        if (formError) return//se tiver um erro retorna, assim, faazendo com que usuário nao possa seguir com a inserção do post

        const data = {//função será executada nos itens do state
            title,
            image,
            body,
            tagsArray,
            uid: user.uid,//id do usuario
            createdBy: user.displayName//nome usuario
        }       

        updateDocument(id, data)

        //redirect to home page - redirecionar para a página inicial
        navigate("/dashboard")
    }

    return (
        <div className={styles.edit_post}>
            {post && (//espera o post chegar para exibir tela de edicao, para não haver erros
                <>
                    <h2>Editando post: {post.title}</h2>
                    <p>Altere os dados do post como desejar</p>
                    <form onSubmit={handleSubmit}>
                        <label>
                            <span>Título:</span>
                            <input type="text" name='title' required placeholder='Pense num bom título...'
                                onChange={(e) => setTitle(e.target.value)} value={title} />
                        </label>
                        <label>
                            <span>URL da imagem:</span>
                            <input type="text" name='image' required placeholder='Insira uma imagem que representa o seu post'
                                onChange={(e) => setImage(e.target.value)} value={image} />
                        </label>
                        <p className={styles.preview_title}>Preview da imagem atual:</p>
                        <img className={styles.image_preview} src={post.image} alt={post.title} />
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
                        {!response.loading && <button className="btn">Editar post</button>}
                        {response.loading && (<button className="btn" disabled>Aguarde.. .</button>)}
                        {(response.error || formError) && (<p className="error">{response.error || formError}</p>)}
                    </form></>
            )}
        </div >
    )
}

export default EditPost