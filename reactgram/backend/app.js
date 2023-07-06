require("dotenv").config() //nos da acesso ao arquivo '.env' onde estão as variáveis de ambiente

const express = require("express") //chamando express
const path = require("path") //chamando path - do próprio node.js
const cors = require("cors") //para acessar o projeto da própria aplicação de front-end

const port = process.env.PORT //inicializando dotenv

const app = express() //inicializando aplicação

//config JSON and form data response
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//Solve CORS - quando as requisições são executadas pelo mesmo domínio
app.use(cors({ credentials: true, origin: "http://localhost:3001" })) //origin - de onde esta vindo a requisição

//Upload diretório - diretório de upload de imagens
app.use("/uploads", express.static(path.join(__dirname, "/uploads")))//juntando nome do diretório atual(_dirname) com /uploads

//DB connection
require("./config/db.js")

// routes
const router = require("./routes/Router.js")
app.use(router) //todas as rotas colocadas em routes>Router.js, servirão como base para nossa aplicação

app.listen(port, () => {
  console.log(`App rodando na porta ${port}`)
})
