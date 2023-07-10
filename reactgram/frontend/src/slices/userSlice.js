import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userService from '../services/userService'

const initialState = {//estado inicial com user vazio, mensage é nula
    user: {},
    error: false,
    success: false,
    loading: false,
    message: null
}

//Get user details
export const profile = createAsyncThunk(
    "user/profile",
    async (user, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token

        const data = await userService.profile(user, token)

        return data
    }
)

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        resetMessage: (state) => {
            state.message = null
        },//reseta msg
    },
    extraReducers: (builder) => {//parte das execuções que são feitas na api//builder-construtor: cria ações separadamente
        builder.addCase(profile.pending, (state) => {//se a requisição foi enviada mas não obteve nenhuma resposta   
            state.loading = true
            state.error = null
        })
            .addCase(profile.fulfilled, (state, action) => {//significa que a operação foi concluída com sucesso.
                state.loading = false
                state.success = true
                state.error = null
                state.user = action.payload//é possível trafegar dados, não apenas mexer nos states exibição na tela
            })
    },
})
export const { resetMessage } = userSlice.actions//função de resetar mensagem
export default userSlice.reducer//reducer