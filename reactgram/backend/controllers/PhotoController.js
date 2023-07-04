const Photo = require("../models/Photo")
const User = require("../models/User")
const mongoose = require("mongoose")//configs bd

//Insert a photo, with an user related to it - Insira uma foto, com um usuário relacionado a ela
const insertPhoto = async (req, res) => {
    const { title } = req.body
    const image = req.file.filename

    const reqUser = req.user

    const user = await User.findById(reqUser._id)//busca de user por id

    //Create a phot
    const newPhoto = await Photo.create({
        image,
        title,
        userId: user._id,
        userName: user.name
    })

    //If photo was created successfully, return data - Se a foto foi criada com sucesso, retorne os dados
    if (!newPhoto) {
        res.status(422).json({ errors: ["Houve um problema, por favor tente novamente mais tarde."] })
    }

    res.status(201).json(newPhoto)
}

module.exports = {
    insertPhoto,
}