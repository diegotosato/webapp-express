//import express
const express = require('express')
const app = express()
const PORT = 3000

//import connection database
const connection = require('./database/connection')

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