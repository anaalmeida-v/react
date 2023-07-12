import { configureStore } from '@reduxjs/toolkit'//importação necessária

import authReducer from './slices/authSlice'//autentication
import userReducer from "./slices/userSlice"//user
import photoReducer from "./slices/photoSlice"//photo

export const store = configureStore({//onde contexts estão sendo salvos(deve ser feita a execução da função importada acima 'configureStore')
    reducer:{//onde fica os contexts
        auth: authReducer,
        user: userReducer,
        photo: photoReducer
    }
})