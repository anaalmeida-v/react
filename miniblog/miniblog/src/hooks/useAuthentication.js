import {
    getAuth,
    createUserWithEmailAndPassword,
    sigInWithEmailAndPassword,
    updateProfile,
    signOut
} from 'firebase/auth'

import { useEffect, useState } from 'react'

export const useAuthentication = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)
}