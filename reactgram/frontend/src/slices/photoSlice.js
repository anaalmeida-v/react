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
export const publishPhoto = createAsyncThunk("photo/publish", async (photo, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token//obter token
    const data = await photoService.publishPhoto(photo, token)//foto e autenticação do usuário

    //check for erros - verificar se há erros
    if (data.errors) {
        return thunkAPI.rejectWithValue(data.errors[0])
    }//rejeita e exibe no formulário

    return data
})

//get user photos - obter fotos do usuário
export const getUserPhotos = createAsyncThunk("photo/userphotos", async (id, thunkAPI) => {//nome + ID e thunkAPI

    const token = thunkAPI.getState().auth.user.token//user validation for being a private method
    const data = await photoService.getUserPhotos(id, token)
    return data//retorna dados 
})

//delete a photo - remover uma foto
export const deletePhoto = createAsyncThunk("photo/delete", async (id, thunkAPI) => {

    const token = thunkAPI.getState().auth.user.token//user validation for being a private method
    const data = await photoService.deletePhoto(id, token)
    //check for erros - verificar se há erros
    if (data.errors) {
        return thunkAPI.rejectWithValue(data.errors[0])
    }//rejeita e exibe no formulário

    return data
})

//update a photo - atualizar
export const updatePhoto = createAsyncThunk("photo/update", async (photoData, thunkAPI) => {

    const token = thunkAPI.getState().auth.user.token//user validation for being a private method
    const data = await photoService.updatePhoto({ title: photoData.title }, photoData.id, token)

    //check for erros - verificar se há erros
    if (data.errors) {
        return thunkAPI.rejectWithValue(data.errors[0])
    }//rejeita e exibe no formulário

    return data
})

export const photoSlice = createSlice({
    name: "publish",
    initialState,
    reducers: {
        resetMessage: (state) => {
            state.message = null
        },
    },
    extraReducers: (builder) => {//parte das execuções que são feitas na api//builder-construtor: cria ações separadamente
        builder
            .addCase(publishPhoto.pending, (state) => {//se a requisição foi enviada mas não obteve nenhuma resposta   
                state.loading = true;
                state.error = null;
            })
            .addCase(publishPhoto.fulfilled, (state, action) => {//significa que a operação foi concluída com sucesso.
                state.loading = false;
                state.success = true;
                state.error = null;
                state.photo = action.payload;//é possível trafegar dados, não apenas mexer nos states exibição na tela
                state.photos.unshift(state.photo);
                state.message = "Foto publicada com sucesso!";
            })
            .addCase(publishPhoto.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.photo = null;
            })
            .addCase(getUserPhotos.pending, (state) => {//se a requisição foi enviada mas não obteve nenhuma resposta   
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserPhotos.fulfilled, (state, action) => {//significa que a operação foi concluída com sucesso.
                state.loading = false;
                state.success = true;
                state.error = null;
                state.photos = action.payload;//é possível trafegar dados, não apenas mexer nos states exibição na tela
            }).addCase(deletePhoto.pending, (state) => {//se a requisição foi enviada mas não obteve nenhuma resposta   
                state.loading = true;
                state.error = null;
            })
            .addCase(deletePhoto.fulfilled, (state, action) => {//significa que a operação foi concluída com sucesso.
                state.loading = false;
                state.success = true;
                state.error = null;
                state.photos = state.photos.filter((photo) => {
                    return photo._id !== action.payload.id
                })
                state.message = action.payload.message
            })
            .addCase(deletePhoto.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.photo = {};
            }).addCase(updatePhoto.pending, (state) => {//se a requisição foi enviada mas não obteve nenhuma resposta   
                state.loading = true;
                state.error = null;
            })
            .addCase(updatePhoto.fulfilled, (state, action) => {//significa que a operação foi concluída com sucesso.
                state.loading = false;
                state.success = true;
                state.error = null;
                state.photos.map((photo) => {
                    if (photo._id !== action.payload.photo._id) {
                        return photo.title = action.payload.photo.title
                    }
                    return photo
                })
                state.message = action.payload.message
            })
            .addCase(updatePhoto.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.photo = {};
            })
    }
})

export const { resetMessage } = photoSlice.actions
export default photoSlice.reducer