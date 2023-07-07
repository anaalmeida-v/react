import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'//para ser possível resgatar dado da storage

export const useAuth = () => {
    const { user } = useSelector((state) => state.auth)//pegando usuário state da autenticação

    const [auth, setAuth] = useState(false)
    const [loading, setLoading] = useState(true)//uma maneira de resgatar dados de login caso usuário recarregue a página

    useEffect(() => {//checando se usuário está logado

        if (user) {//se usuário está setado
            setAuth(true)//está autenticado
        } else {
            setAuth(false)
        }
        setLoading(false)

    }, [user])//useEffect será executado sempre que usuário mudar

    return { auth, loading }
}