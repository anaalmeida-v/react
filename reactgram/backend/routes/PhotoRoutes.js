const express = require("express")
const router = express.Router()

// Controller
const { insertPhoto, deletePhoto, getAllPhotos, getUserPhotos, getPhotoById, } = require("../controllers/PhotoController")

// Middlewares
const { photoInsertValidation } = require("../middlewares/PhotoValidation")
const authGuard = require("../middlewares/authGuard")//autenticação
const validate = require("../middlewares/handleValidation")
const { imageUpload } = require("../middlewares/imageUpload")

// Routes
router.post("/", authGuard, imageUpload.single("image"), photoInsertValidation(), validate, insertPhoto)
router.delete("/:id", authGuard, deletePhoto);
router.get("/", getAllPhotos);
router.get("/user/:id", getUserPhotos);
router.get("/:id", getPhotoById);

module.exports = router