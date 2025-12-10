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

    //keep id
    const id = Number(req.params.id)

    //prepare first query
    const movieSql = "SELECT * FROM movies WHERE id = ?"

    //connect first query, check an error server side, manage results lenght, isolate into a variable the result
    connection.query(movieSql, [id], (err, movieResult) => {
        if (err) return err.status(500).json({ error: true, message: err.message })
        if (movieResult.length === 0) return res.status(404).json({ error: true, message: 'Movie not found' })

        const movie = movieResult[0]
    })
}


module.exports = {
    index,
    show
}