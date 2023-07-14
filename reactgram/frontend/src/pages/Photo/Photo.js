import './Photo.css'

import { uploads } from '../../utils/config'//onde contém as imagens

//components
import Message from '../../components/Message'
import PhotoItem from '../../components/PhotoItem'
import LikeContainer from '../../components/LikeContainer'
import { Link } from 'react-router-dom'

//hooks
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useResetComponentMessage } from '../../hooks/useResetComponentMessage'

//redux
import { getPhoto, like, comment } from '../../slices/photoSlice'

const Photo = () => {
    const { id } = useParams()

    const dispatch = useDispatch()

    const resetMessage = useResetComponentMessage(dispatch)

    const { user } = useSelector((state) => state.auth)//usuário autenticado
    const { photo, loading, error, message } = useSelector((state) => state.photo);//dados do state da photo

    const [commentText, setCommentText] = useState("")

    //load photo data - carregar dados da foto
    useEffect(() => {
        dispatch(getPhoto(id))
    }, [dispatch, id])//entrando na página a foto já estará sendo carregada 

    //insert a like
    const handleLike = () => {
        dispatch(like(photo._id))

        resetMessage()
    }

    //insert a comment
    const handleComment = (e) => {
        e.preventDefault()

        const commentData = {//dados do comentário
            comment: commentText,
            id: photo._id,
        }

        dispatch(comment(commentData))//disptach no comentário passando seus respectivos dados
        
        setCommentText("")//resetando form de comment, por ser um controller de input

        resetMessage()//tirar mensagem de sucesso
    }

    if (loading) {
        return <p>Carregando...</p>
    }

    return (
        <div id="photo">
            <PhotoItem photo={photo} />
            <LikeContainer photo={photo} user={user} handleLike={handleLike} />
            <div className="message-container">
                {error && <Message msg={error} type="error" />}
                {message && <Message msg={message} type="success" />}
            </div>
            {photo.comments && (
                <>
                    <div className="comments">
                        <h3>Comentários ({photo.comments.length})</h3>{/*contagem de coments*/}
                        <form onSubmit={handleComment}>
                            <input type="text" placeholder="Insira o seu comentário..." onChange={(e) => setCommentText(e.target.value)} value={commentText} />
                            <input type="submit" value="Enviar" />
                        </form>
                        {photo.comments.length === 0 && <p>Não há comentários...</p>}{/* se a quantidade de comtários for =0, será exibido um parágrafo */}
                        {photo.comments.map((comment) => (//cada comentário é 'comment'
                            <div className='comment' key={comment.comment}>{/*key com texto do comentário/div do comentário individual*/}
                                <div className='author'>{/* dados do autor do comentário */}
                                    {comment.userImage && (//se houver imagem do usuário, exibe
                                        <img src={`${uploads}/users/${comment.userImage}`} alt={comment.userName} />
                                    )}
                                    <Link to={`/users/${comment.userId}`}>
                                        <p>{comment.userName}</p>
                                    </Link>{/*é um link para ser possível acessar o perfil do usuário*/}
                                </div>
                                <p>{comment.comment}</p>{/* texto - comentário */}
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

export default Photo