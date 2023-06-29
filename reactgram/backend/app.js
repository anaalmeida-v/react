require("dotenv").config()//nos da acesso ao arquivo '.env' onde estão as variáveis de ambiente

const express = require("express") //chamando express
const path = require("path") //chamando path - do próprio node.js
const cors = require("cors") //para acessar o projeto da própria aplicação de front-end

const port = process.env.PORT//inicializando dotenv

const app = express() //inicializando aplicação

//config JSON and form data response
app.use(express.json)
app.use(express.urlencoded({ extended: false }))

app.listen(port, () => {
  console.log(`App rodando na porta ${port}`)
})