const express = require('express')
const dotenv = require('dotenv')
const hbs = require('express-handlebars')
const path = require('path')
const database = require('./database/data.json')

// Initial env variables
dotenv.config()

const app = express()
// Set templete engine
app.engine('.hbs', hbs.engine({ extname: '.hbs' }))
app.set('view engine', '.hbs')

// Initial static files
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Initialize routes
app.use('/', require('./routes/main.routes'))

const PORT = process.env.PORT || 3000
// 
app.listen(PORT, ()=>{
    console.log(`Server is running on PORT : ${PORT}`);
})