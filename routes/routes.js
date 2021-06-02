const authRoutes = require('./authRoute')
const dashboardRoutes = require('./dashboardRoute')
const uploadRoute = require('./uploadRoutes')

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