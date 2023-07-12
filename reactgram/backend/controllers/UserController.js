const User = require("../models/User")//importando model

const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { default: mongoose } = require("mongoose")

const jwtSecret = process.env.JWT_SECRET

// Generate user token
const generateToken = (id) => {//espera um id pois ele será inserido no token
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: "7d",
  })//gerando token e passando id(ser possível fazer alguma manipulação eventualmente), o jwtSecret(criação desse token) e data de expiração(logout automático depois deste tempo)
}

// Register user and sign in
const register = async (req, res) => {
  const { name, email, password } = req.body//usando variáveis vindas do corpo da requisição

  //check if user existts-verificando se usuário existe
  const user = await User.findOne({ email })//findOne- retorna o primeiro documento que ele encontrar na collection que corresponda com o campo name.
  //verificando se model encontra usuário pelo email(pois email é único)

  if (user) {
    res.status(422).json({ errors: ["Por favor, utilize outro e-mail."] })
    return
  }

  //Generate password hash / gerar hash da senha - uma hash é o que fica salvo no bd depois de salvar uma senha
  const salt = await bcrypt.genSalt() //gera string aleatória
  const passwordHash = await bcrypt.hash(password, salt) //gera senha aleatória para não haver por exemplo de alguém pegar uma senha pelo que há no banco de dados(acessando o banco de dados de forma indevida)

  // Create user
  const newUser = await User.create({
    name,
    email,
    password: passwordHash,
  })

  //checagem para saber se usuário foi criado com sucesso, retorna o token
  if (!newUser) {
    res.status(422).json({
      errors: ["Houve um erro, por favor tente novamente mais tarde."],
    }) //se user n foi criado com sucesso retorna msg de erro(json) + err422
    return
  }

  res.status(201).json({
    _id: newUser._id,
    token: generateToken(newUser._id),
  }) //se foi criado com sucesso retorna 201(status de criacao com sucess)+obj em formato json com id do usuário e o token(criado a partir do id do usuário)
}

//get current logged in user - obter usuário logado-atual
const getCurrentUser = async (req, res) => {
  const user = req.user//usuário da requisicao

  res.status(200).json(user)//retorna um json com os dados do usuário
}

//fazer login do usuário
const login = async (req, res) => {
  const { email, password } = req.body//chaves vindas do body necessárias para fazer login

  const user = await User.findOne({ email })

  // Check if user exists
  if (!user) {
    res.status(404).json({ errors: ["Usuário não encontrado!"] })
    return
  }//se usuário n existir será exibido um err404 + mensagem de erro

  // Check if password matches
  if (!(await bcrypt.compare(password, user.password))) {
    res.status(422).json({ errors: ["Senha inválida!"] })
    return
  }

  // Return user with token
  res.status(200).json({
    _id: user._id,
    profileImage: user.profileImage,
    token: generateToken(user._id),
  })
}

// Update user
const update = async (req, res) => {
  const { name, password, bio } = req.body//parâmetros que podem vir ou não da requisição

  let profileImage = null//ainda será preenchida

  if (req.file) {//checando se chegou algo na propriedade da req 'file'
    profileImage = req.file.filename//nome de arquivo modificado
  }

  const reqUser = req.user//usuário da req

  const user = await User.findById(reqUser._id).select("-password")//passando string da req para tipo de object id, tirando password que não é necessário
  //esse id é vindo do token
  if (name) {
    user.name = name
  }

  if (password) {
    //Generate password hash / gerar hash da senha - uma hash é o que fica salvo no bd depois de salvar uma senha
    const salt = await bcrypt.genSalt()//gera string aleatória
    const passwordHash = await bcrypt.hash(password, salt)
    user.password = passwordHash
  }

  if (profileImage) {
    user.profileImage = profileImage
  }

  if (bio) {
    user.bio = bio
  }

  await user.save()

  res.status(200).json(user)
}

// Get user by id
const getUserById = async (req, res) => {
  const { id } = req.params//extraindo id da url(por ser um Get - dado > desestruturação > valor)

  const user = await User.findById(id).select("-password")//encontra usuário pelo id

  ////Check if user exists - checando se user existe
  if (!user) {
    res.status(404).json({ errors: ["Usuário não encontrado!"] })
    return
  }

  res.status(200).json(user)//se deu tudo certo não passa pelo if e exibe os dados do usuário em json
}

module.exports = {
  register,
  getCurrentUser,
  login,
  update,
  getUserById,
}