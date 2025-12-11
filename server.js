//import express
const express = require('express')
const app = express()
const PORT = 3000

//impoprt CORS
const cors = require('cors')

//import routes
const moviesRouter = require('./routes/movies')

//import middlewares
const handleError = require('./middlewares/handleError')
const notFound = require('./middlewares/notFound')

//set-up cors
app.use(cors({
    origin: 'http://localhost:5173/'
}))

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