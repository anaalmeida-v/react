const User = require("../models/User"); //importando model
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");

const jwtSecret = process.env.JWT_SECRET;

//Generate user token
const generateToken = (id) => {
  //espera um id pois ele será inserido no token
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: "7d",
  }); //gerando token e passando id(ser possível fazer alguma manipulação eventualmente), o jwtSecret(criação desse token) e data de expiração(logout automático depois deste tempo)
};

//Register user and sign in
const register = async(req, res) => {
  res.send("Registro");
};

module.exports = {
  register
};
