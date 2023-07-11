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


        const data = await userService.profile(user, token)//acessa método profile do userService passando user e token
        console.log(data);
        return data//envia dados obtidos através do service
    }
)

//update user details - atualizar detalhes do usuário
export const updateProfile = createAsyncThunk("user/update", async (user, thunkAPI) => {
    const token = thunkAPI.getState.auth.user.token

    const data = await userService.updateProfile(user, token)

    //check for erros - verificar se há erros
    if (data.errors) {
        return thunkAPI.rejectWithValue(data.errors[0])
    }

    return data
})


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
            }).addCase(updateProfile.pending, (state) => {//se a requisição foi enviada mas não obteve nenhuma resposta   
                state.loading = true
                state.error = false
                //adicionando casos
            }).addCase(updateProfile.fulfilled, (state, action) => {//significa que a operação foi concluída com sucesso.
                state.loading = false;
                state.success = true;
                state.error = null;
                state.user = action.payload;
                state.message = "Usuário atualizado com sucesso!";//é possível trafegar dados, não apenas mexer nos states exibição na tela
            }).addCase(updateProfile.rejected, (state, action) => {//significa que a operação falhou tem um action pois tem o dado da mensagem de erro
                state.loading = false//false pois já respondeu algo, logo, não está carregando
                state.error = action.payload//baseado nisso, tem como pegar o erro e exibir na tela
                state.user = null//está tentando cadastrar ou logar, mas não há usuário
            });
    },
});

export const { resetMessage } = userSlice.actions//função de resetar mensagem
export default userSlice.reducer//reducer