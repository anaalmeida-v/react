import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import photoService from "../services/photoService";

const initialState = {//estado inicial de fotos
    photos: [],
    photo: {},//foto individual
    error: false,
    success: false,
    loading: false,
    message: null,
};

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

    const token = thunkAPI.getState().auth.user.token;//user validation for being a private method
    const data = await photoService.getUserPhotos(id, token);
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
    const data = await photoService.updatePhoto({ title: photoData.title }, photoData.id, token)//atualizando dados de acordo com os dados da foto

    //check for erros - verificar se há erros
    if (data.errors) {
        return thunkAPI.rejectWithValue(data.errors[0])
    }//rejeita e exibe no formulário

    return data
})

//get photo by id - obter foto por id
export const getPhoto = createAsyncThunk("photo/getphoto", async (id, thunkAPI) => {

    const token = thunkAPI.getState().auth.user.token//user validation for being a private method
    const data = await photoService.getPhoto(id, token)

    return data
})

//like a photo
export const like = createAsyncThunk("photo/like", async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token//user validation for being a private method
    const data = await photoService.like(id, token)

    //check for erros - verificar se há erros
    if (data.errors) {
        return thunkAPI.rejectWithValue(data.errors[0])
    }//rejeita e exibe no formulário

    return data
})

//add comment to a photo - adicionar comentário a foto
export const comment = createAsyncThunk("photo/comment", async (commentData, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token//user validation for being a private method
    const data = await photoService.comment({ comment: commentData.comment }, commentData.id, token)//texto do comentário + id da foto + dados do usuário

    //check for erros - verificar se há erros
    if (data.errors) {
        return thunkAPI.rejectWithValue(data.errors[0])
    }//rejeita e exibe no formulário

    return data
})

//get all photos - obter todas as fotos
export const getPhotos = createAsyncThunk("photo/getall", async (_, thunkAPI) => {//quando não há um 1° argumento, coloca-se o '_' e o react-redux entende que o argumento é despensável

    const token = thunkAPI.getState().auth.user.token//user validation for being a private method
    const data = await photoService.getPhotos(token)
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
            }).addCase(updatePhoto.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updatePhoto.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;

                state.photos.map((photo) => {
                    if (photo._id === action.payload.photo._id) {//verificando se photo._id(representa cada uma das fotos do state que preenche quando aplica o get) realmente vem do backend
                        return photo.title = action.payload.photo.title
                    }//atualizar foto que está no frontend para não ser necessário fazer uma nova só para atualizar dados(é feita essa atualização já com os dados do backend)
                    return photo;
                });

                state.message = action.payload.message;
            })
            .addCase(updatePhoto.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.photo = null;
            }).addCase(getPhoto.pending, (state) => {//se a requisição foi enviada mas não obteve nenhuma resposta   
                state.loading = true;
                state.error = false;
            })
            .addCase(getPhoto.fulfilled, (state, action) => {//significa que a operação foi concluída com sucesso.
                state.loading = false;
                state.success = true;
                state.error = null;
                state.photo = action.payload;
            }).addCase(like.fulfilled, (state, action) => {//significa que a operação foi concluída com sucesso.
                state.loading = false;
                state.success = true;
                state.error = null;

                //foto individual
                if (state.photo.likes) {//se houver um array de likes na foto
                    state.photo.likes.push(action.payload.userId)//preenche coração
                }

                //caso esteja no feed da home por exemplo
                state.photos.map((photo) => {
                    if (photo._id === action.payload.photoId) {//verificando se photo._id(representa cada uma das fotos do state que preenche quando aplica o get) realmente vem do backend
                        return photo.likes.push(action.payload.userId)//ação de like
                    }
                    return photo;
                });
                state.message = action.payload.message
            })
            .addCase(like.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }).addCase(comment.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;

                state.photo.comments.push(action.payload.comment);

                state.message = action.payload.message;
            })
            .addCase(comment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }).addCase(getPhotos.pending, (state) => {//se a requisição foi enviada mas não obteve nenhuma resposta   
                state.loading = true;
                state.error = false;
            })
            .addCase(getPhotos.fulfilled, (state, action) => {//significa que a operação foi concluída com sucesso.
                state.loading = false;
                state.success = true;
                state.error = null;
                state.photos = action.payload;//é possível trafegar dados, não apenas mexer nos states exibição na tela
            })
    }
})
export const { resetMessage } = photoSlice.actions;
export default photoSlice.reducer;