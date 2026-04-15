require('dotenv').config()
const express = require('express')
const app = express()

app.use(express.json())

const confessionRoutes = require('./routes/confessionRoutes')

// 🌐 Routes
app.use('/api/v1/confessions', confessionRoutes)

// 🚀 Server using ENV variable
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`running on ${PORT}`)
})