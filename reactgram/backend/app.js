const express = require("express"); //chamando express
const path = require("path"); //chamando path - do próprio node.js
const cors = require("cors"); //para acessar o projeto da própria aplicação de front-end

const port = 5000;

const app = express(); //inicializando aplicação

//config JSON and form data response
app.use(express.json);
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => {
  console.log(`App rodando na porta ${port}`);
});
