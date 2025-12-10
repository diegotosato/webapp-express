//import connection database
const connection = require('../database/connection')

const index = (req, res) => {

    //prepare query
    const sql = "SELECT * FROM movies"

    //connect the query, check an error server side, return json of movies list
    connection.query(sql, (err, results) => {
        if (err) return err.status(500).json({ error: true, message: err.message })
        res.json(results);
    })
}

const show = (req, res) => {
    res.send('Show the movie with id: ' + req.params.id)
}


module.exports = {
    index,
    show
}