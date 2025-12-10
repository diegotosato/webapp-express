//import connection database
const connection = require('../database/connection')

const index = (req, res) => {
    res.send('Show all movies')
}

const show = (req, res) => {
    res.send('Show the movie with id: ' + req.params.id)
}


module.exports = {
    index,
    show
}