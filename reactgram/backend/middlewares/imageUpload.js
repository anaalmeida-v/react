const multer = require("multer")//para upload de arquivos
const path = require("path")//padrao do node

// Destination to store image - saber destino da imagem
const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {//req/arquivo, possibilidade de callback
        let folder = ""//variável pasta é uma string vazia

        if (req.baseUrl.includes("users")) {//vendo se aonde imagem está sendo inserida contém user
            folder = "users"
        } else if (req.baseUrl.includes("photos")) {
            folder = "photos"
        }

        cb(null, `uploads/${folder}/`);//onde imagem ficará salva - destino da imagem
    },//mudando estilo padrão
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))//o resultado disso será a string da data.jpg
    }//mudando nome padrão
})

const imageUpload = multer({
    storage: imageStorage,
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg)$/)) {//verificando se no fim do arquivo há uma extensão jpeg ou png

            //upolad only png and jpg formats 
            return cb(new Error("Por favor, envie apenas png ou jpg"))
        }
        cb(undefined, true)
    }
})//validação da imagem + define onde ela será salva

module.exports = { imageUpload }