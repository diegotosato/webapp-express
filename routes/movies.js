const express = require('express')
const router = express.Router()

//import controller
const moviesController = require('../controllers/moviesController')

const upload = require('../middlewares/fileUpload')

router.get('/', moviesController.index)

router.get('/:id', moviesController.show)




router.post('/', upload.single('image'), moviesController.store)


router.post('/:id/reviews', upload.single('image'), moviesController.storeReview)

router.delete('/:id', moviesController.destroy)



module.exports = router