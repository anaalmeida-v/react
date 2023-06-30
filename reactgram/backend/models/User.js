const mongoose = require("mongoose");
const { Schema } = mongoose;
//o models é dividido em duas partes: //Schema- esquema(como ele é constituído)
//model - objeto que possui os métodos(inserir, deletar, ler)

const userSchema = new Schema(
  {
    //dados do usuário
    name: String,
    email: String,
    password: String,
    profileImage: String, //foto de perfil do usuário
    bio: String,
  },
  {
    timestamps: true, //2 campós serão criados no model(createdate/updatedate)-com isso qnd usuário é criado e atualizado, o horário e a data são marcados
  }
);
const User = mongoose.model("User", userSchema); //definindo model com o nome de "User" e com o Schema 'userSchema'

module.exports = User;//exportando user