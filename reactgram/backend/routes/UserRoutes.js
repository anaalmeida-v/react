const express = require("express")
const router = express.Router()

//Controller
const { register, login, getCurrentUser, update} = require("../controllers/UserController") //desestruturação de função vinda do controller

//Middlewares
const validate = require("../middlewares/handleValidation")
const {
  userCreateValidation, // validacao criação de user
  loginValidation, //validacao login
  userUpdateValidation,
} = require("../middlewares/userValidations")
const authGuard = require("../middlewares/authGuard")
const { imageUpload } = require("../middlewares/imageUpload")

//Routes
router.post("/register", userCreateValidation(), validate, register) //rota de post+caminho+funcao usada para registro
router.post("/login", loginValidation(), validate, login)
router.get("/profile", authGuard, getCurrentUser)
router.put(
  "/",
  authGuard,
  userUpdateValidation(),
  validate,
  imageUpload.single("profileImage"),//carregando img
  update
)

module.exports = router