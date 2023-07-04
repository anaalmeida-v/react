//ROTAS DA APLICAÇÃO

const express = require("express") //chamada express
const router = express() //chamada router

router.use("/api/users", require("./UserRoutes"))//prefixo de api
router.use("/api/photos", require("./PhotoRoutes"))

//test route
router.get('/', (req, res) => {
  //função anônima que aceita req e res é padrão
  res.send("API Working!")
})

module.exports = router//export routers