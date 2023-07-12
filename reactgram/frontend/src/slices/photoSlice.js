import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import photoService from '../services/photoService'

const initialState = {//estado inicial de fotos
    photos: [],
    photo: {},//foto individual
    error: false,
    success: false,
    loading: false,
    message: null
}

//publish user photo - publicar foto do usuário
export const publishPhoto = createAsyncThunk("photo/publish", async(photo, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token//obter token
    const data = await photoService.publishPhoto(photo, token)//foto e autenticação do usuário

    //check for erros - verificar se há erros
    if (data.errors) {
        return thunkAPI.rejectWithValue(data.errors[0])
    }//rejeita e exibe no formulário

    return data
})

//get user photos - obter fotos do usuário
export const getUserPhotos = createAsyncThunk("photo/userphotos", async(id, thunkAPI) => {//nome + ID e thunkAPI

    const token = thunkAPI.getState().auth.user.token//user validation for being a private method
    const data = await photoService.getUserPhotos(id, token)
    return data//retorna dados 
})

export const photoSlice = createSlice({
    name: "photo",
    initialState,
    reducers: {
        resetMessage: (state) => {
            state.message = null
        },
    },
    extraReducers: (builder) => {//parte das execuções que são feitas na api//builder-construtor: cria ações separadamente
        builder.addCase(publishPhoto.pending, (state) => {//se a requisição foi enviada mas não obteve nenhuma resposta   
            state.loading = true
            state.error = null
        }).addCase(publishPhoto.fulfilled, (state, action) => {//significa que a operação foi concluída com sucesso.
            state.loading = false
            state.success = true
            state.error = null
            state.photo = action.payload//é possível trafegar dados, não apenas mexer nos states exibição na tela
            state.photos.unshift(state.photo)
            state.message = "Foto publicada com sucesso!"
        }).addCase(publishPhoto.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
            state.photo = {}
        }).addCase(getUserPhotos.pending, (state) => {//se a requisição foi enviada mas não obteve nenhuma resposta   
            state.loading = true
            state.error = null
        }).addCase(getUserPhotos.fulfilled, (state, action) => {//significa que a operação foi concluída com sucesso.
            state.loading = false
            state.success = true
            state.error = null
            state.photo = action.payload//é possível trafegar dados, não apenas mexer nos states exibição na tela
        })
    }
})

export const { resetMessage } = photoSlice.actions
export default photoSlice.reducer