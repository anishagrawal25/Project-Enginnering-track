require('dotenv').config() // load environment variables so sensitive config is not hardcoded

const express = require('express')
const app = express()

// enable JSON parsing so the server can read request bodies from clients
app.use(express.json())

const confessionRoutes = require('./routes/confessionRoutes')

// delegate all confession-related routes to a separate router to keep app.js clean
app.use('/api/v1/confessions', confessionRoutes)

// use environment variable for flexibility across environments, fallback ensures app still runs locally
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  // logging actual port helps debugging when deployed on dynamic environments
  console.log(`running on ${PORT}`)
})