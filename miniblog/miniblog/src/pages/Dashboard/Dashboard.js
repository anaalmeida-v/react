import styles from './Dashboard.module.css'

import { Link } from 'react-router-dom'

//hooks
import { useAuthValue } from '../../context/AuthContext'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'

const Dashboard = () => {

  const { user } = useAuthValue()
  const uid = user.uid//id do user

  //posts do usuário
  const { documents: posts, loading } = useFetchDocuments("posts", null, uid)

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Gerencie os seus posts</p>
      {posts && posts.length === 0 ? (//caso não haja posts
        <div className={styles.noposts}>
          <p>Não foram encontrados posts</p>
          <Link to="/posts/create" className='btn'>Criar primeiro post</Link>
        </div>
      ) : (//caso haja posts
        <div>
          <p>Tem posts!</p>
        </div>
      )}

      {posts && posts.map((post) => (<h3>{post.title}</h3>))}{/* exibir posts na dashboard */}
    </div>
  )
}

export default Dashboard