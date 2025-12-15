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

    //prepare second query
    const reviewSql = "SELECT reviews.* FROM reviews JOIN movies ON reviews.movie_id = movies.id WHERE movies.id = ?"

    //connect first query, check an error server side, manage results lenght, isolate into a variable the result
    connection.query(movieSql, [id], (err, movieResult) => {
        if (err) return err.status(500).json({ error: true, message: err.message })
        if (movieResult.length === 0) return res.status(404).json({ error: true, message: 'Movie not found' })

        const movie = movieResult[0]

        //connect second query, check an error server side, add reviews key to movie object, return the json film
        connection.query(reviewSql, [id], (err, reviewResult) => {
            if (err) return err.status(500).json({ error: true, message: err.message })

            movie.reviews = reviewResult

            res.json(movie)
        })

    })
}


const store = (req, res) => {
    const { title, director, abstract, genre, release_year } = req.body
    const image = req.file ? req.file.filename : null

    const imagePath = `http://localhost:3000/uploads/${image}`

    const sql = "INSERT INTO movies (title, director, abstract, genre, release_year, image) VALUES (?, ?, ?, ?, ?, ?)"

    connection.query(sql, [title, director, abstract, genre, release_year, image], (err, results) => {
        if (err) return err.status(500).json({ error: true, message: err.message })
        res.status(201).json({ message: "Movie created", movieId: results.insertId })
    })

}


const storeReview = (req, res) => {
    const movieId = Number(req.params.id)
    const { name, vote, text } = req.body

    const sql = "INSERT INTO reviews (movieId, name, vote, text) VALUES (?, ?, ?, ?)"

    connection.query(sql, [movieId, name, vote, text], (err, results) => {
        if (err) return err.status(500).json({ error: true, message: err.message })
        res.status(201).json({ message: "Review created", movieId: results.insertId })
    })

}

module.exports = {
    index,
    show,
    store
}