//req. http que lida com a autenticação do usuário

import { api, requestConfig } from "../utils/config"//utilizados para facilitar na hora de fazer requisições

//Register an user - registrar usuário 
const register = async (data) => {//funcao async. que recebe dados do usuário

    //formação do request
    const config = requestConfig("POST", data)//config. de requisição, execução de função de config.js enviando o tipo e os dados da requisição

    try {
        const res = await fetch(api + "/users/register", config)
            .then((res) => res.json())
            .catch((err) => err)
        //espera uma resposta de um await fetch url + caminho da requisição config previamente configurada acima.then:recebe dados e transforma em um obj js se algo der errado, cai no catch e erro é retornado
        if (res) {
            localStorage.setItem("user", JSON.stringify(res))
        }//item user do localstorage transformado em res no formato string json

        return res
    } catch (error) {
        console.log(error)
    }
}

//Logout an user - sair de um usuário
const logout = () => {
    localStorage.removeItem("user")//remove user do localstorage
}

//Sign in an user - Logar um usuário
const login = async (data) => {//função assíncrona recebe dados do usuário

    const config = requestConfig("POST", data)//configs do request config: envio de dados + dados(email e senha)

    try {
        const res = await fetch(api + "/users/login", config)
            .then((res) => res.json())//pega dados e transforma no texto na requisição
            .catch((err) => err)//pega possível erro da requisição e retorna

        if(res._id){//se resposta veio
            localStorage.setItem("user", JSON.stringify(res))//pega dados de user na localstorage e converte para string json
        }

        return res
    } catch (error) {
        console.log(error)
    }
}

const authService = {
    register,
    logout,
    login,
}

export default authService