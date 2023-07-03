const { body } = require("express-validator") //entrega tudo oq vem do corpo da requisição

const userCreateValidation = () => {
  //validação da criação de usuário
  return [
    //retorna possíveis erros baseados no body
    body("name") //nome do usuário
      .isString() //validando se nome é uma string
      .withMessage("O nome é obrigatório!!")
      .isLength({ min: 3 }) //nome precisa ter no min 3 letras
      .withMessage("O nome precisa ter no mínimo 3 caracteres."),
    body("email") //validando email
      .isString()
      .withMessage("O email é obrigatório!!")
      .isEmail()
      .withMessage("Insira um email válido."),
    body("password")
      .isString()
      .withMessage("A senha é obrigatória!!")
      .isLength({ min: 5 }) //senha precisa ter no min 5 letras
      .withMessage("A senha precisa ter no mínimo 5 caracteres."),
    body("confirmpassword")
      .isString()
      .withMessage("A confirmação de senha é obrigatória!!")
      .custom((value, { req }) => {
        //value-valor recebido do campo
        if (value != req.body.password) {
          //comparando valor com senha enviada pela requisição
          throw new Error("As senhas não são iguais")
        }
        return true
      }),
  ]
}

module.exports = {
  userCreateValidation,
}
