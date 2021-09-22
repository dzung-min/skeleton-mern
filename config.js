const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost/mern-project',
  jwtSecret: 'jkdgffwgsdfsvfaftyrwurgoiegerhgkdhgkdhg',
}

module.exports = config
