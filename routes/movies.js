const express = require('express')
const router = express.Router()

//import multer
const multer = require('multer')
const path = require('path')

//import controller
const moviesController = require('../controllers/moviesController')

router.get('/', moviesController.index)

router.get('/:id', moviesController.show)


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '_' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + '-' + file.originalname.replaceAll(' ', '_'))
    }
})

const upload = multer({ storage: storage })


router.post('/', upload.single('image'), moviesController.store)

module.exports = router