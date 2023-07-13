import { api, requestConfig } from '../utils/config'

//publish an user photo - publicar uma foto de usuário
const publishPhoto = async (data, token) => {//token - função é restrita para quem está logado, por isso a necessidade

    const config = requestConfig("POST", data, token, true)//true(há imagem envolvida)

    try {
        const res = await fetch(api + "/photos", config)//url a ser atingida com respectivos valores
            .then((res) => res.json())
            .catch((err) => err)

        return res//retorna resposta
    } catch (error) {
        console.log(error)
    }
}

//get user photos - obter fotos do usuário
const getUserPhotos = async (id, token) => {//id do usuário, pois a foto vai ser pega de um user específico

    const config = requestConfig("GET", null, token)//uma url precisa ser atingida com isso

    try {

        const res = await fetch(api + "/photos/user/" + id, config)
            .then((res) => res.json())
            .catch((err) => err)

        return res
    } catch (error) {
        console.log(error)
    }
}

//delete a photo - excluir uma foto
const deletePhoto = async (id, token) => {//id e token: identificação do usuário
    const config = requestConfig("DELETE", "", token);

    try {
        const res = await fetch(api + "/photos/" + id, config)
            .then((res) => res.json())
            .catch((err) => err);

        return res;
    } catch (error) {
        console.log(error);
    }
};

//update a photo - atualizar uma foto
const updatePhoto = async (data, id, token) => {//dados, id e token por ser uma função privada 
    const config = requestConfig("PUT", data, token)//put-atualização de dados, data e token para configurar o request

    try {

        const res = await fetch(api + "/photos/" + id, config)
            .then((res) => res.json())
            .catch((err) => err)

        return res
    } catch (error) {
        console.log(error)
    }
}

const photoService = {//exportando funções
    publishPhoto,
    getUserPhotos,
    deletePhoto,
    updatePhoto,
}

export default photoService//para futuramente acessar funções do objeto