//ROTAS DA APLICAÇÃO

const express = require("express");
const router = express();

router.use("/api/users", require("./UserRoutes.js"))//prefixo de api
router.use("/api/photos", require("./PhotoRoutes.js"))

//test route
router.get('/', (req, res) => {
  //função anônima que aceita req e res é padrão
  res.send("API Working!")
})

module.exports = router//export routers