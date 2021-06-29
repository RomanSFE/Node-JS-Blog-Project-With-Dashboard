const authRoutes = require('./authRoute')
const dashboardRoutes = require('./dashboardRoute')
const uploadRoute = require('./uploadRoutes')
const postRoute = require('./postRoute')
const apiRoutes = require('../api/routes/apiRouts')
const exploreRoutes = require('./exploreRoutes')
const searchRoute = require('./searchRoute')
const authorRoute = require('./authorRoutes')

const routes = [
    {
        path: '/auth',
        handler: authRoutes
    },
    {
        path: '/dashboard',
        handler: dashboardRoutes
    },
    {
        path: '/uploads',
        handler: uploadRoute
    },
    {
        path: '/posts',
        handler: postRoute
    },
    {
        path: '/explorer',
        handler: exploreRoutes
    },
    {
        path: '/search',
        handler: searchRoute
    },
    {
        path: '/author',
        handler: authorRoute
    },
    {
        path: '/api',
        handler: apiRoutes
    },
    {
        path: '/',
        handler: (req, res) => {

            res.json({
                message: 'Hello Node js'
            })
        }
    }
]

module.exports = app => {
    routes.forEach(r => {
        if(r.path == '/') {
            app.get(r.path, r.handler)
        } else {
            app.use(r.path, r.handler)
        }
    })
}