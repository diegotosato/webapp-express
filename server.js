//import express
const express = require('express')
const app = express()
const PORT = 3000

//import routes
const moviesRouter = require('./routes/movies')

//import middlewares
const handleError = require('./middlewares/handleError')
const notFound = require('./middlewares/notFound')

//body parser
app.use(express.json())
//register static assets
app.use(express.static('public'))

//put server on listening
app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
})

//create first route
app.get('/', (req, res) => {
    res.send('My movies reviews API server')
})


app.use('/api/movies', moviesRouter)


//use midllewares
app.use(handleError)
app.use(notFound)