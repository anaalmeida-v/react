const express = require("express"); //chamando express
const app = express(); //inicializando express

//ler requisição em json
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json()); //lendo em json

//rotas - endpoints
app.get("/", (req, res) => {
  res.json({ message: "Primeira rota criada com sucesso" }); //resposta em json
});

app.listen(3000); //executar alguma porta(3000)
