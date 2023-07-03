const express = require("express")
const router = express.Router()

//Controller
const { register } = require("../controllers/UserController") //desestruturação de função vinda do controller

//Middlewares
const validate = require("../middlewares/handleValidation")
const { userCreateValidation } = require("../middlewares/useValidations")

//Routes
router.post("/register", userCreateValidation(), validate, register) //rota de post+caminho+funcao usada para registro

module.exports = router
