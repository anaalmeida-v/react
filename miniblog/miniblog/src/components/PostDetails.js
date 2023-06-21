import styles from './PostDetails.module.css'

import { Link } from 'react-router-dom'

const PostDetails = ({post}) => {
    return (//exibição posts
        <div className={styles.post_detail}>
            <img src={post.image} alt={post.title} />
            <h2>{post.title}</h2>
            <p className={styles.createdBy}>{post.createdBy}</p>
            <div className={styles.tags}>
                {post.tagsArray.map((tag) => (
                    <p key={tag}><span>#</span>{tag}</p>//tags exibidas com #
                ))}
            </div>
            <Link to={`/posts/${post.id}`} className="btn btn-outline">Ler</Link>
            {/* encaminhando para detalhes do post */}
        </div>
    )
}

export default PostDetails