const express = require('express')
const categoryRoutes = require('./src/routes/categoryRoutes')
const offerRoutes = require('./src/routes/offerRoutes')
const productRoutes = require('./src/routes/productRoutes')
const resolutionRoutes = require('./src/routes/resolutionRoutes')
const productModel = require('./src/models/productModel')
const complaintsRoutes = require('./src/routes/complaintsRoutes')
const complaintsModels = require('./src/models/complaintsModels')
const resolutionModels = require('./src/models/resolutionModels')

const pool = require('./src/config/db')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 5001

// Middleware
app.use(express.json())
app.use(cors())

// Routes
app.use('/', categoryRoutes)
app.use('/', productRoutes)
app.use('/', offerRoutes)
app.use('/', resolutionRoutes)
app.use('/', complaintsRoutes)

// Initialize the database table
;(async () => {
  await complaintsModels.createComplaintsTable()
})()
;(async () => {
  await resolutionModels.createResolutionTable()
})()
;(async () => {
  await productModel.createProductTable()
})()
// ;(async () => {
//   await offerController.createOfferTable()
// })()


// Create customer table if not exists

;(async () => {
  try {
    await pool.query('SELECT NOW()') // Test query to check if connected
    console.log('Database connection successful')

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  } catch (err) {
    console.error('Database connection error: ', err.message)
    process.exit(1)
  }
})()