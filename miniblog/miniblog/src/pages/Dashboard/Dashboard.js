import styles from '../Dashboard/Dashboard.module.css'

import { Link } from 'react-router-dom'

//hooks
import { useAuthValue } from '../../context/AuthContext'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import { deleteDoc } from 'firebase/firestore'

const Dashboard = () => {

  const { user } = useAuthValue()
  const uid = user.uid

  //posts do usuario
  const { documents: posts, loading } = useFetchDocuments("posts", null, uid)

  const deleteDocument = (id) => {
    if(loading) {
      return <p>Carregando...</p>
    }
  }

  return (
    <div className={styles.dashboard}>
      <h2>Dashboard</h2>
      <p>Gerencie os seus posts</p>
      {posts && posts.length === 0 ? (//caso não haja posts
        <div className={styles.noposts}>
          <p>Não foram encontrados posts</p>
          <Link to="/posts/create" className='btn'>Criar primeiro post</Link>
        </div>
      ) : (//caso haja posts
       <>
        <div className={styles.post_header}>
        <span>Título</span>
        <span>Ações</span>
        </div>
        {posts && posts.map((post)=>
          <div key={post.id} className={styles.pos_row}>
            <p>{post.title}</p>
            <div>
              <Link to={`/posts/${post.id}`} className='btn btn-outline'>Ver</Link>{/* ver posts */}
              <Link to={`/posts/edit/${post.id}`} className='btn btn-outline'>Editar</Link>{/* editar posts */}
              <button onClick={()=>deleteDocument(post.id)} className='btn btn-outline btn-danger'>Excluir</button>{/* excluir post */}
            </div>
          </div>
        )}{/* exibir posts na dashboard */}
      </>
      )}
    </div>
  )
}

export default Dashboard