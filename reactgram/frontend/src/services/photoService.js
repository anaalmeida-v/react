import { api, requestConfig } from '../utils/config'

//publish an user photo - publicar uma foto de usuário
const publishPhoto = async (data, token) => {//token - função é restrita para quem está logado, por isso a necessidade

    const config = requestConfig("POST", data, token, true)//true(há imagem envolvida)

    try {

        const res = await fetch(api + '/photos', config)//url a ser atingida com respectivos valores
            .then((res) => res.json())
            .catch((err) => err)

        return res//retorna resposta
    } catch (error) {
        console.log(error)
    }
}
const photoService = {
    publishPhoto,
}
export default photoService//para futuramente acessar funções do objeto