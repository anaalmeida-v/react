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
app.post("/createproduct", (req, res) => {
  const name = req.body.name;
  const price = req.body.price;

  if (!name) {
    res.status(422).json({ message: "O campo nome é obrigatório!" });
    return
  }

  console.log(name);
  console.log(price);

  res
    .status(201)
    .json({ message: `O produto ${name} foi criado com sucesso!` }); //.status(201)-A requisição foi bem sucedida e um novo recurso foi criado como resultado. Esta é uma tipica resposta enviada após uma requisição POST.
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "Primeira rota criada com sucesso" }); //.status(200)-Estas requisição foi bem sucedida. O significado do sucesso varia de acordo com o método HTTP
}); //resposta em json

app.listen(3000); //executar alguma porta(3000)
