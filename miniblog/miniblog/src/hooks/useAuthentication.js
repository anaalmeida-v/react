import {
    getAuth,
    createUserWithEmailAndPassword,
    sigInWithEmailAndPassword,
    updateProfile,
    signOut
} from 'firebase/auth' 
//db de configs do firebase não será usado para salvar autenticacao de usuario

import { useEffect, useState } from 'react'//funcao do react necessarias

export const useAuthentication = () => {//funcao hook
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    //cleanup - como haverá muitas mudanças de componentes entre páginas, 'resquícios' de funções n podem ficar sendo executados
    //deal with memory leak - lidar com vazamento de memória
    
    const [cancelled, setCancelled] = useState(false)//as ações futuras do componente serão canceladas(assim que tudo der certo e houver a mudança de false para true)
    
    const auth = getAuth()//nao quer dizer que usuario esteja autenticado, mas sim que funções de autenticação poderão ser usadas a partir desta função

    function checkIfIsCancelled() {
        if(cancelled){
            return
        }
    }
}