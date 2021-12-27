const cors = require('cors')
require('dotenv').config()
const express = require('express')
const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
var logger = require('morgan')
const app = express()
const mongoose = require('mongoose')
const { usersRoutes } = require('./routes/users.routes')
const { dishesRoutes } = require('./routes/dishes.routes')
const { dishCategoriesRoutes } = require('./routes/dishCategories.routes')
const { resetPasswordRoute } = require('./routes/resetPassword.routes')
const { dishOriginRoutes } = require('./routes/dishOrigins.routes')
const { paymentRoutes } = require('./routes/payment.routes')
const { dishSearchRoute } = require('./routes/dishSearch.routes')
const { restaurantsRoutes } = require('./routes/restaurants.routes')
const { cartRoutes } = require('./routes/cart.routes')
const { checkoutRoutes } = require('./routes/checkout.routes')
const path = require('path')

const PORT = Number(process.env.PORT) || 3000
// app.use(logger('morgan'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
mongoose.connect(require('./config/conf').DB_ATLAS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}).then(() => {
    console.log('connected to database successfully')
}).catch(() => {
    console.log('Failed to connect to database')
})


const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "MealPass Food Delivery System",
            version: "1.0.0",
            description: "apis to access mealpass apis online"
        },
        servers: [
            {
                // url:"http://localhost:3000",
                url: "https://meal-pass-rw.herokuapp.com/"

            }
        ]
    },

    apis: ["./routes/*.js"]
}

const specs = swaggerJsDoc(options)
app.get('/', (_, res) => {
    res.send('Welcome to MealPass Application')
})

app.get('/pay', (req, res) => {
    res.sendFile(path.join(__dirname + "/index.html"))
})
app.use('/user', usersRoutes)
app.use('/dish', dishesRoutes)
app.use('/dish/category', dishCategoriesRoutes)
app.use('/dish/origin', dishOriginRoutes)
app.use('/password-reset', resetPasswordRoute)
app.use('/payment', paymentRoutes)
app.use('/search', dishSearchRoute)
app.use('/restaurant', restaurantsRoutes)
app.use('/cart', cartRoutes)
app.use('/checkout', checkoutRoutes)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs))
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`))
