//ROTAS DA APLICAÇÃO

const express = require("express"); //chamada express
const router = express(); //chamada router

//test route
router.get('/', (req, res) => {
  //função anônima que aceita req e res é padrão
  res.send("API Working!");
});

module.exports = router;
