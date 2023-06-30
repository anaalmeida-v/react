const mongoose = require("mongoose"); //importando mongoose
//connection
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
//trazendo de '.env'

const conn = async () => {
  try {
    const dbConn = await mongoose.connect(//conectando ao banco de dados
    `mongodb+srv://${dbUser}:${dbPassword}@cluster.fvnirbj.mongodb.net/`
    ); //concatenando variáveis q contém user e senha do mongodbproj

    console.log("Conectou ao banco!");
    return dbConn;
  } catch (error) {
    //caso de erro na conexão
    console.log(error);
  }
};

conn();
module.exports = conn;
