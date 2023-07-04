const express = require("express")
const router = express.Router()

//Controller
const { register, login, getCurrentUser } = require("../controllers/UserController") //desestruturação de função vinda do controller

//Middlewares
const validate = require("../middlewares/handleValidation")
const {
  userCreateValidation, // validacao criação de user
  loginValidation, //validacao login
} = require("../middlewares/userValidations")
const authGuard = require("../middlewares/authGuard")//Aula194 -Resgatando usuário autenticado

//Routes
router.post("/register", userCreateValidation(), validate, register) //rota de post+caminho+funcao usada para registro
router.post("/login", loginValidation(), validate, login)
router.get("/profile", authGuard, getCurrentUser)//Aula194 -Resgatando usuário autenticado

module.exports = router
