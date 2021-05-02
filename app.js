const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);

// Import Routes
const authRoutes = require('./routes/authRoute')
const dashboardRoutes = require('./routes/dashboardRoute')

// Import Middleware
const {bindUserWithRequest} = require('./middleware/authMiddleware')
const setLocals = require('./middleware/setLocals')

// Session store
const mongoUrii = 'mongodb+srv://roman:roman500500@cluster0.b0s2y.mongodb.net/nodeproject?retryWrites=true&w=majority'
const store = new MongoDBStore({
    uri: mongoUrii,
    collection: 'sessions'
});
// End

const app = express()

// Setup View Engine
app.set('view engine', 'ejs')
app.set('views', 'views')

// MiddleWare
const middleware = [
    morgan('dev'),
    express.static('public'),
    express.urlencoded({ extended: true }),
    express.json(),
    session({
       secret: process.env.SECRET_KEY || 'SECRET_KEY',
       resave: false,
       saveUninitialized: false,
       store: store,
    }),
    bindUserWithRequest(),
    setLocals()
]
app.use(middleware)

app.use('/auth', authRoutes)
app.use('/dashboard', dashboardRoutes)

app.get('/', (req, res) => {

    res.json({
        message: 'Hello Node js'
    })
})

const PORT = process.env.PORT || 8080

// const mongoUrii = 'mongodb+srv://roman:roman500500@cluster0.b0s2y.mongodb.net/nodeproject?retryWrites=true&w=majority'
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
