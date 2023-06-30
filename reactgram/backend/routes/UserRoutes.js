const express = require("express");
const router = express.Router();

//Controller
const { register } = require("../controllers/UserController"); //desestruturação de função vinda do controller

//Routes
router.post("/register", register); //rota de post+caminho+funcao usada para registro

module.exports = router;
