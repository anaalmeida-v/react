import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
} from "firebase/auth"
//db de configs do firebase não será usado para salvar autenticacao de usuario

import { useState, useEffect } from "react"//funcao do react necessarias

export const useAuthentication = () => {//função hook
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    //cleanup - como haverá muitas mudanças de componentes entre páginas, 'resquícios' de funções n podem ficar sendo executados
    //deal with memory leak - lidar com vazamento de memória

    const [cancelled, setCancelled] = useState(false)//as ações futuras do componente serão canceladas(assim que tudo der certo e houver a mudança de false para true)

    const auth = getAuth()//nao quer dizer que usuario esteja autenticado, mas sim que funções de autenticação poderão ser usadas a partir desta função

    function checkIfIsCancelled() {
        if (cancelled) {
            return
        }
    }

    //register
    const createUser = async (data) => {
        checkIfIsCancelled()

        setLoading(true)//se não tiver cancelado, loading é true
        //setError(null)

        //validações do backend estao prontas
        //tentar criar form(try), se nao der certo(catch)
        try {
            const { user } = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )//com isso, um usuario será direcionado

            await updateProfile(user, {
                displayName: data.displayName,
            })

            return user

        } catch (error) {
            console.log(error.message)
            console.log(typeof error.message)

            let systemErrorMessage

            if (error.message.includes("Password")) {//se erro for na senha
                systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres."
            } else if (error.message.includes("email-already")) {//se erro estiver no email
                systemErrorMessage = "E-mail já cadastrado."
            } else {//ou se erro estiver qualquer outra coisa além desses dois
                systemErrorMessage = "Ocorreu um erro, por favor tenta mais tarde."
            }
            setError(systemErrorMessage)
        }
        setLoading(false)//se acabou função, acabou loading
    }

    //logout - sign out
    const logout = () => {
        checkIfIsCancelled()

        signOut(auth)//passando quem está autenticado
    }

    //login - sign in
    const login = async (data) => {//data - retorna dados// é feito assim pq assim espera o usuário
        //ser autenticado para a operação 

        checkIfIsCancelled()//checagem de memória
        setLoading(true)
        setError(false)

        try {
            await signInWithEmailAndPassword(auth, data.email, data.password)
            //setLoading(false)

        } catch (error) {

            let systemErrorMessage

            if (error.message.includes("user-not-found")) {//se a mensagem de erro inclui"user-not-found(usuário não existe)"
                systemErrorMessage = "Usuário não encontrado."
            } else if (error.message.includes("wrong-password")) {//se a mensagem de erro incluir "wrong-password a senha está incorreta"

                systemErrorMessage = "Senha incorreta."
            } else {//se qualquer outro erro acontecer, exibirá a msg abaixo
                systemErrorMessage = "Ocorreu um erro, por favor tenta mais tarde."
            }
            setError(systemErrorMessage)//o erro vai para o componente e será exibido na tela do usuário
        }
        setLoading(false)

    }

    useEffect(() => {//cancelado vai ser true, assim q saírmos desta página - será utilizado apenas uma vez
        return () => setCancelled(true)
    }, [])

    return {
        auth,
        createUser,
        error,
        logout,
        login,
        loading,
    }
}//funções são retornadas para que assim seja possível utilizá-las em outro lugar

