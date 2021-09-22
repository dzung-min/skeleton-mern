const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')

const config = require('./config')
const template = require('./template')
const errorHandler = require('./middlewares/errorHandler')
const apiRouter = require('./routers/api/index.js')
const authRouter = require('./routers/auth.router')

const app = express()

if (config.env === 'development') app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(helmet())

app.get('/', (req, res) => {
  res.send(template())
})

app.use('/auth', authRouter)

app.use('/api', apiRouter)

app.use(errorHandler.notFound)
app.use(errorHandler.generic)

module.exports = app
