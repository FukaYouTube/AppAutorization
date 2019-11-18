require('dotenv').config()
require('mongoose').connect(process.env.URL_MONGO, { useNewUrlParser: true, useUnifiedTopology: true })

const express           = require('express')
const expressSession    = require('express-session')
const bodyParser        = require('body-parser')
const app               = express()

const fs            = require('fs')
const https         = require('https')

app.set('view engine', 'ejs')
app.use('/public', express.static('public'))
app.use(bodyParser.json(), bodyParser.urlencoded({ extended: false }))
app.use(expressSession({ secret: 'cookiesecret', cookie: { maxAge: null }, resave: false, saveUninitialized: false }))

// router
const { authRouter } = require('./routes')

app.use('/', authRouter)

let port = process.env.PORT || 3000
let server = https.createServer({ key: fs.readFileSync('server.key'), cert: fs.readFileSync('server.cert') }, app)
server.listen(port, () => console.log(`Connect on port: ${port}`))