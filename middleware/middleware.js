const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
const flash = require('connect-flash')

const {bindUserWithRequest} = require('./authMiddleware')
const setLocals = require('./setLocals')

// Session store
const mongoUrii = 'mongodb+srv://roman:roman500500@cluster0.b0s2y.mongodb.net/nodeproject?retryWrites=true&w=majority'

const store = new MongoDBStore({
    uri: mongoUrii,
    collection: 'sessions'
});
// End

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
    flash(),
    bindUserWithRequest(),
    setLocals()
]

module.exports = app => {
    middleware.forEach(m => {
        app.use(m)
    })
}