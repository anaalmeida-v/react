const multer = require("multer")//para upload de arquivos
const path = require("path")//padrao do node

//Destination to store image - saber destino da imagem
const imageStore = multer.diskStorage({
    destination: function (req, file, cb) {//req/arquivo, possibilidade de callback
        let folder = ""//variável pasta é uma string vazia

        if (req, basUrl.includes("users")) {//vendo se aonde imagem está sendo inserida contém user
            folder = "users"
        } else if (req.baseUrl.includes("photos")) {
            folder = "photos"
        }

        cb(null, `uploads/${folder}/`)//onde imagem ficará salva
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))//tratando do nome da img//o resultado disso será a string da data.jpg
    }
})

const imageUpload = multer({
    storage: imageStore,
    fileFilter(req, res, cb) {
        if (!file.originalname.match(/\.(png|jpg)$/)) {

            //upolad only png and jpg formats 
            return cb(new Error("Por favor, envie apenas png ou jpg"))
        }
        cb(undefined, true)
    }
})//validação da imagem + define onde ela será salva

module.exports = { imageUpload }