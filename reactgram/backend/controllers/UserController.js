const User = require("../models/User") //importando model
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { default: mongoose } = require("mongoose")

const jwtSecret = process.env.JWT_SECRET

//Generate user token
const generateToken = (id) => {
  //espera um id pois ele será inserido no token
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: "7d",
  }) //gerando token e passando id(ser possível fazer alguma manipulação eventualmente), o jwtSecret(criação desse token) e data de expiração(logout automático depois deste tempo)
}

//Register user and sign in
const register = async (req, res) => {
  const { name, email, password } = req.body //usando variáveis vindas do corpo da requisição

  //check if user existts-verificando se usuário existe
  const user = await User.findOne({ email }) //findOne- retorna o primeiro documento que ele encontrar na collection que corresponda com o campo name.
  //verificando se model encontra usuário pelo email(pois email é único)

  if (user) {
    res.status(422).json({ errors: ["Por favor, utilize outro e-mail"] })
    return
  }

  //Generate password hash / gerar hash da senha - uma hash é o que fica salvo no bd depois de salvar uma senha
  const salt = await bcrypt.genSalt() //gera string aleatória
  const passwordHash = await bcrypt.hash(password, salt) //gera senha aleatória para não haver por exemplo de alguém pegar uma senha pelo que há no banco de dados(acessando o banco de dados de forma indevida)

  //create user
  const newUser = await User.create({
    name,
    email,
    password: passwordHash,
  })

  //checagem para saber se usuário foi criado com sucesso, retorna o token
  if (!newUser) {
    res
      .status(422)
      .json({ errors: ["Houve um erro, por favor tente mais tarde."] })
    return
  } //se user n foi criado com sucesso retorna msg de erro(json) + err422
  res.status(201).json({
    _id: newUser._id,
    token: generateToken(newUser._id),
  }) //se foi criado com sucesso retorna 201(status de criacao com sucess)+obj em formato json com id do usuário e o token(criado a partir do id do usuário)
}

//fazer login do usuário
const login = async (req, res) => {
  const { email, password } = req.body //chaves vindas do body necessárias para fazer login

  const user = await User.findOne({ email })

  //check if user exists
  if (!user) {
    res.status(404).json({ errors: ["Usuário não encontrado"] })
    return
  } //se usuário n existir será exibido um err404 + mensagem de erro

  //check if password matches-check se senhas combinam
  if (!(await bcrypt.compare(password, user.password))) {
    //comparando senhas, se não combinam é executado o if
    res.status(422).json({ errors: ["Senha inválida"] })
    return
  }

  //return user with token(deu tudo certo, não houve erros)
  res.status(200).json({
    _id: user._id,
    profileImage: user.profileImage,
    token: generateToken(user._id),
  })
}

module.exports = {
  register,
  login,
}
