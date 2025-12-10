const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('Show all movies')
})

router.get('/:id', (req, res) => {
    res.send('Show the movie with id: ' + req.params.id)
})

module.exports = router