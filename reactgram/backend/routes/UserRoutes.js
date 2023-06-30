const express = require("express");
const router = express.Router();

//Controller
const { register } = require("../controllers/UserController"); //desestruturação de função vinda do controller

//Middlewares
const validate = require("../middlewares/handleValidation");

//Routes
router.post("/register", validate, register); //rota de post+caminho+funcao usada para registro

module.exports = router;
