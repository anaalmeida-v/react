const { validationResult } = require("express-validator")//método 'validationResult' veio do express-validator

const validate = (req, res, next) => {//os parâmetros recebidos é o padrão do middler
  //next - quando prosseguimos ou não baseado em algum fato que aconteceu na requisição(deixar, prosseguir, parar)

  const errors = validationResult(req)//erros vem da requisição
  //toda requisição que obter um middler de validação retornará possíveis erros

  if (errors.isEmpty()) {
    return next()
  } //se nao tem erro prosseguir//.isEmpty()- verifica se a string de entrada está vazia ou não

  const extractedErrors = []//erros extraídos

  errors.array().map((err) => extractedErrors.push(err.msg))//erros trasnformados em array, logo em seguida é feito um .map e cada erro vira 'err'
  //a mensagem de cada um desses erros vai para 'extractedErrors'

  return res.status(422).json({//todos os erros são retornados e um status é exibido, nesse caso o 422(respostas são passadas em json)
    errors: extractedErrors, //no front-end essa variável será consumida para saber o erro que ocorreu
  })
}

module.exports = validate 
