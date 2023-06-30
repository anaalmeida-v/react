const mongoose = require("mongoose");
const { Schema } = mongoose;

const photoSchema = new Schema(
  {
    image: String, //será salvo o caminho da imagem, pois no bd não salva imagens
    title: String,
    likes: Array, //array porque os interesses são a quantidade e informações do usuário, isso nos leva a um array de objetos
    comments: Array, //qtd+conteudo_coment+infor.user
    userId: mongoose.ObjectId, //id-usuario que inseriu a foto - .ObjectId: indica que não é uma string comum e sim de idmongoose(mais complexo)
    userName: String, //nome usuario
  },
  {
    timestamps: true,
  }
);

const Photo = mongoose.model("Photo", photoSchema);

module.exports = Photo;
