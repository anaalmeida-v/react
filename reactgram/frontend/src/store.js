import { configureStore } from '@reduxjs/toolkit'//importação necessária

import authReducer from "./slices/authSlice"

export const store = configureStore({//onde contexts estão sendo salvos(deve ser feita a execução da função importada acima 'configureStore')
    reducer:{//onde fica os contexts
        auth: authReducer,
    }
})