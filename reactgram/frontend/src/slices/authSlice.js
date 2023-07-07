import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import authService from "../services/authService"//de onde sai as funções para a execução de coisas do sistema que correspondem ao slice
//sices e services estão diretamente ligados

const user = JSON.parse(localStorage.getItem("user"))//resgatando usuário salvo pelo service na localstorage

const initialState = {//estado inicial
    user: user ? user : null,
    error: false,
    success: false,
    loading: false,
}

//Register an user and sign in - Registrar um usuário e entrar
//exportando as funções
export const register = createAsyncThunk("auth/register", async (user, thunkAPI) => {//recebe usuário e thunkAPI(nos permite utilizar funções extrasex.: para a execução e identificar um erro da api)
    const data = await authService.register(user)//user vem do componente register//tentativa de fazer cadastro do mesmo 

    //check for errors - checagem de erros
    if (data.errors) {//se houver erros
        return thunkAPI.rejectWithValue(data.errors[0])//rejeitando requisição pois houve algo de errado manualmente
    }//errors vem de backend onde existem diversas mensagens, com o 0 de índice(1º elemento do array), será sempre exibido o 1º erro

    return data//retorno do usuário cadastrado
}
)

export const authSlice = createSlice({//importando authSlice com funções criadas
    name: "auth",//deve ser renomeado, e assim que ele será chamado na storage - auth
    initialState,//estado inicial
    reducers: {
        reset: (state) => {//todos os estados serão resetados(ficarão como eram no início)
            state.loading = false
            state.error = false
            state.success = false
        },
    },
    extraReducers: (builder) => {//parte das execuções que são feitas na api//builder-construtor: cria ações separadamente
        builder.addCase(register.pending, (state) => {//se a requisição foi enviada mas não obteve nenhuma resposta   
            state.loading = true
            state.error = null
            //adicionando casos
        }).addCase(register.fulfilled, (state, action) => {//significa que a operação foi concluída com sucesso.
            state.loading = false
            state.success = true
            state.error = null
            state.user = action.payload//é possível trafegar dados, não apenas mexer nos states exibição na tela
        }).addCase(register.rejected, (state, action) => {//significa que a operação falhou tem um action pois tem o dado da mensagem de erro
            state.loading = false//false pois já respondeu algo, logo, não está carregando
            state.error = action.payload//baseado nisso, tem como pegar o erro e exibir na tela
            state.user = null//está tentando cadastrar ou logar, mas não há usuário
        })
    }
})
export const { reset } = authSlice.actions//vem de authSlice.actions(pode haver várias actions)
export default authSlice.reducer