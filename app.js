const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')

// Routes
const authRoutes = require('./routes/authRoute')

const app = express()

// Setup View Engine
app.set('view engine', 'ejs')
app.set('views', 'views')

// MiddleWare
const middleware = [
    morgan('dev'),
    express.static('public'),
    express.urlencoded({ extended: true }),
    express.json()
]
app.use(middleware)

app.use('/auth', authRoutes)

app.get('/', (req, res) => {

    res.json({
        message: 'Hello Node js'
    })
})

const PORT = process.env.PORT || 8080

const mongoUrii = 'mongodb+srv://roman:roman500500@cluster0.b0s2y.mongodb.net/nodeproject?retryWrites=true&w=majority'
mongoose.connect(mongoUrii, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
.then(() =>{
    console.log('Database Connected')
    app.listen(PORT, () => {
        console.log( `Server is running on PORT ${PORT}` )
    })
})
.catch (e => {
    return console.log(e)
})
