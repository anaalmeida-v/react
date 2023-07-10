import { api, requestConfig } from '../utils/config'

//get user details - obter detalhes do usuário
const profile = async (data, token) => {
    const config = requestConfig("GET", data, token)//config da requisição passando a função requestConfig recebendo método get e os dados e o token

    try {

        const res = await fetch(api + "/users/profile", config)//perfil do usuário logado(baseado no token)
            .then((res) => res.json)//será transformada em obj javascript
            .catch((err) => err)//se houver algum erro

        return res
    } catch (error) {
        console.log(error)
    }
}

const userService = {
    profile
}

export default userService