import styles from './Post.module.css'

//hooks
import { useParams } from 'react-router-dom'

const Post = () => {

    const {id} = useParams()

    return (
        <div>
            <h1>Post{id}</h1>{/* imprimindo id que foi resgatado de useParams() */}
        </div>
    )
}

export default Post