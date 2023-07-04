const express = require("express")
const router = express.Router()

// Controller

// Middlewares
const { photoInsertValidation } = require("../middlewares/PhotoValidation")
const authGuard = require("../middlewares/authGuard")//autenticação
const validate = require("../middlewares/handleValidation")

// Routes

module.exports = router