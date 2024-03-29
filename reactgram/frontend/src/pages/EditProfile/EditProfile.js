import "./EditProfile.css";

import { uploads } from "../../utils/config";//diretório onde são feitos uploads de imagem

// Hooks
import { useEffect, useState } from "react";//react
import { useSelector, useDispatch } from "react-redux";//redux

// Redux - slice
import { profile, updateProfile, resetMessage } from "../../slices/userSlice";

// Components
import Message from "../../components/Message";

const EditProfile = () => {
    const dispatch = useDispatch();

    //dados  vem do redux
    const { user, message, error, loading } = useSelector((state) => state.user);//estados vindos do user

    //variáveis necessárias
    const [name, setName] = useState(user.name ?? "");
    const [email, setEmail] = useState(user.email ?? "");
    const [password, setPassword] = useState(user.password ?? "");
    const [profileImage, setProfileImage] = useState(user.profileImage ??"");
    const [bio, setBio] = useState(user.bio ?? "");
    const [previewImage, setPreviewImage] = useState(user.previewImage ?? "");

    //load user data - carregar dados do usuário
    useEffect(() => {
        dispatch(profile());
    }, [dispatch]);


    //fill form with user data - preencher formulário com dados do usuário
    useEffect(() => {
        if (user) {//se tiver usuário, retornará os dados:
            setName(user.name);
            setEmail(user.email);
            setBio(user.bio);
        }
    }, [user]);//sempre que usuário mudar useEffect é disparado

    const handleSubmit = async (e) => {
        e.preventDefault();//utilizada para prevenir o comportamento padrão de um evento.

        //gather user data form states - reunir os estados do formulário de dados do usuário
        const userData = {
            name,
        };
        //só envia o necessário
        if (profileImage) {
            userData.profileImage = profileImage;
        }

        if (bio) {
            userData.bio = bio;
        }

        if (password) {
            userData.password = password;
        }


        //build form data - criar dados do formulário
        const formData = new FormData()//instanciando objeto
        const userFormData = Object.keys(userData).forEach((key) => formData.append(key, userData[key]));
        //loop em todas as chaves que serão enviadas//foreach- executa a função em cada elemento de um array//.append-coloca novo valor no final dos valores existente.

        formData.append("user", userFormData);
        await dispatch(updateProfile(formData));//dipstach na updateProfile passando o valor de userFormData

        setTimeout(() => {
            dispatch(resetMessage());
        }, 2000);
    };

    const handleFile = (e) => {//setar valores de imagem
        //image preview
        const image = e.target.files[0];
        setPreviewImage(image);

        //update image state - atualizar estado da imagem
        setProfileImage(image);
    }
    return (
        <div id="edit-profile">
            <h2>Edite seus dados</h2>
            <p className="subtitle">Adicione uma imagem de perfil e conte mais sobre você...</p>
            {(user.profileImage || previewImage) && (
                <img
                    className="profile-image"
                    src={
                        previewImage ? URL.createObjectURL(previewImage) : `${uploads}/users/${user.profileImage}`
                    } alt={user.name}//url.create.....:transformando imagem em html
                />//exibe dados da previewImage ou a imagem(caminho da imagem)
            )}{/*usuario tem imagem ou houve mudanças em previewImage*/}
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Nome" onChange={(e) => setName(e.target.value)} value={name} />
                <input type="email" placeholder="E-mail" disabled value={email} />
                <label>
                    <span>imagem do Perfil: </span><input type="file" onChange={handleFile} /></label>
                <label>
                    <span>Bio: </span><input type="text" placeholder="Descrição do perfil" onChange={(e) => setBio(e.target.value)} value={bio} />
                </label>
                <label>
                    <span>Quer alterar sua senha?: </span><input type="password" placeholder="Digite sua nova senha:" onChange={(e) => setPassword(e.target.value)} value={password} />
                </label>
                {!loading && <input type="submit" value="Atualizar" />}
                {loading && <input type="submit" disabled value="Aguarde..." />}
                {error && <Message msg={error} type="error" />}
                {message && <Message msg={message} type="success" />}
            </form>
        </div>
    )
}

export default EditProfile