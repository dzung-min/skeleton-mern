const mongoose = require('mongoose')

const config = require('./config')
const app = require('./express')

mongoose.connect(config.mongoUri)

mongoose.connection
  .on('error', () => {
    console.log('MongoDB connection error')
    process.exit(1)
  })
  .once('open', () => {
    app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`)
    })
  })
