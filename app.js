const express = require('express')
const mongoose = require('mongoose')

// Import Middleware
const setMiddleware = require('./middleware/middleware')
// Import Routes
const setRoutes = require('./routes/routes')


// Session store
const mongoUrii = 'mongodb+srv://roman:roman500500@cluster0.b0s2y.mongodb.net/nodeproject?retryWrites=true&w=majority'

const app = express()

// Setup View Engine
app.set('view engine', 'ejs')
app.set('views', 'views')


// Using Middleware from Middleware folder
setMiddleware(app)

// Using Routes from Routes folder
setRoutes(app)

// 404 500 Middleware Start
app.use((req, res, next) => {
    let error = new Error('404 Not Found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    if(error.status == 404) {
        return res.render('pages/error/404', {flashMessage: {} })
    }
    console.log(error)
    res.render('pages/error/500', {flashMessage: {} })
})
// 404 500 Middleware End

const PORT = process.env.PORT || 8080


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
