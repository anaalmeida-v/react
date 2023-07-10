import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userService from '../services/userService'

const initialState = {//estado inicial com user vazio, mensage é nula
    user: {},
    error: false,
    success: false,
    loading: false,
    message: null
}

//Get user details - Obter detalhes do usuário
export const profile = createAsyncThunk(
    "user/profile",//renomeando funcao
    async (user, thunkAPI) => {//thunkAPI vai auxiliar para pegar o state
        const token = thunkAPI.getState().auth.user.token//podem ser obtidos dados do redux e do thunkAPI/.user.: salvo no authSlice


        const data = await userService.profile(user, token)//obtemos método profile do userService com user e token
        console.log(data);
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