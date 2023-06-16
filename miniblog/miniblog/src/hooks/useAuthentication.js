import { db } from '../firebase/config'

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
} from "firebase/auth";
//db de configs do firebase não será usado para salvar autenticacao de usuario

import { useState, useEffect } from 'react'//funcao do react necessarias

export const useAuthentication = () => {//funcao hook
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

    const createUser = async (data) => {
        checkIfIsCancelled()

        setLoading(true)//se não tiver cancelado, loading é true
        setError(null)

        //validações do backend estao prontas
        //tentar criar form(try), se nao der certo(catch)
        try {
            const { user } = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )//com isso, um usuario será direcionado

            await updateProfile(user, {
                displayName: data.displayName
            })
            setLoading(false)

            return user

        } catch (error) {
            console.log(error.message)
            console.log(typeof error.message)

            let systemErrorMessage

            if (error.message.includes("Password")) {//se erro for na senha
                systemErrorMessage = "A senha precisa ter pelo menos 6 caracteres."
            } else if (error.message.includes("email-already")) {//se erro estiver no email
                systemErrorMessage = "E-mail já cadastrado."
            } else {//ou se erro estiver qualquer outra coisa além desses dois
                systemErrorMessage = "Ocorrem erro, por favor tente mais tarde."
            }
            setLoading(false)//se acabou função, acabou loading
            console.log(systemErrorMessage);

            setError(systemErrorMessage);
        }
    }

    useEffect(() => {//cancelado vai ser true, assim q saírmos desta página - será utilizado apenas uma vez
        return () => setCancelled(true)
    }, [])

    return (
        auth,
        createUser,
        error,
        loading
    )
}