// DEPENDENCIES
const express = require('express')
const app = express()
const mongoose = require('mongoose')

const methodOverride = require('method-override')
require('dotenv').config()

const PORT = process.env.PORT
const DATABASE_URL = process.env.DATABASE_URL

// DATABASE CONNECTION
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection
db.on('error', (err) => console.log(err.message + ' is mongod not running?'))
db.on('connected', () => console.log('mongodb connected'))
db.on('disconnected', () => console.log('mongodb disconnected'))

// MIDDLEWARE
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended: true}))

// TEST ROUTE
app.get('/', (req, res) => {
    res.send('working!')
})

// LISTEN
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
})