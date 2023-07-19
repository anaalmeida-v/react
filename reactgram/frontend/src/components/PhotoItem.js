import "./PhotoItem.css"

import { uploads } from "../utils/config"//onde fotos estão salvas

import { Link } from "react-router-dom"

const PhotoItem = ({ photo }) => {
    return (
        <div className="photo-item">
            {photo.image && (//check image
                <img src={`${uploads}/photos/${photo.image}`} alt={photo.title} />
            )}
            <h2>{photo.title}</h2>
            {photo.image && (
                <p className="photo-author">
                    Publicada por:{" "}
                    <Link to={`/users/${photo.userId}`}>{photo.userName}</Link>{/*com esse link perfil do usuário poderá ser acessado*/}
                </p>
            )}
        </div>
    )
}

export default PhotoItem