const User = require("../models/User");
const jwt = require("jsonwebtoken");//p ser possível fazer a comparação do token//biblioteca
const jwtSecret = process.env.JWT_SECRET;//apenas com ele é possível realizar de fato o secret//valor

const authGuard = async (req, res, next) => {
  //funcao recebe valores padrão do middler

  //requisições com esse token terá alguns padrões
  const authHeader = req.headers["authorization"]; //headers terão o 'authorization'
  const token = authHeader && authHeader.split(" ")[1];//verifica se authHeader existe, pois requisições que não tem o authorization nao tem o token
  //split-permite dividir/separar strings//com("")a string será dividida entre as palavras e com o índice[1] a string fica dividida por letras

  // Check if header has a token - verificando se header contém o token
  if (!token) return res.status(401).json({ errors: ["Acesso negado!"] });

  // Check if token is valid
  try {
    const verified = jwt.verify(token, jwtSecret);//método verify irá comparar o token com o jwtSecret, se tem esse Secret o tokne é válido

    req.user = await User.findById(verified.id).select("-password");//será retornado um obj com todas propriedades do token e senha não será passada por não ser necessário  //findById-usado para buscar um doc ou um registro em um bd pelo id
    //obtém user vindo do id que veio do token, assim é possível extrair dados desse user sem ter que consultar o banco para utilizar user novamente, isso é passado pra frente, logo, outras funções conseguem utilizar esse use vindo da req

    next();
  } catch (err) {
    res.status(400).json({ errors: ["O Token é inválido!"] });
  }
};

module.exports = authGuard;