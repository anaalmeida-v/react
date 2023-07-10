import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {//estado inicial com user vazio, mensage é nula
    user: {},
    error: false,
    success: false,
    loading: false,
    message: null
}

//funcoes
export const userSlice = createSlice({//reducer (ficará no store)
    name: "user",
    initialState,
    reducers: {
        resetMessage: (state) => {
            state.message = null
        }//reseta msg
    }
})

export const { resetMessage } = userSlice.actions//função de resetar mensagem
export default userSlice.reducer//reducer