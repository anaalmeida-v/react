const express = require("express")
const router = express.Router()

//Controller
const { register, login } = require("../controllers/UserController") //desestruturação de função vinda do controller

//Middlewares
const validate = require("../middlewares/handleValidation")
const {
  userCreateValidation, // validacao criação de user
  loginValidation, //validacao login
} = require("../middlewares/userValidations")

//Routes
router.post("/register", userCreateValidation(), validate, register) //rota de post+caminho+funcao usada para registro
router.post("/login", loginValidation(), validate, login)

module.exports = router
