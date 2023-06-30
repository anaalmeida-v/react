const { validationResult } = require("express-validator");

const validate = (req, res, next) => {
  //quando quer prosseguir ou não baseado em algum fato que aconteceu na requisição(deixar, prosseguir, parar)

  const errors = validationResult(req); //erros vem da requisição

  if (errors.isEmpty()) {
    return next();
  } //se nao tem erro prosseguir

  const extractedErrors = [];

  errors.array().map((err) => extractedErrors.push(err.msg));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = validate;
