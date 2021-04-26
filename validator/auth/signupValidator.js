const { body } = require('express-validator')
const User = require('../../models/User')

module.exports =  [
    body('username')
        .isLength({min: 3, max: 15})
        .withMessage('Username Must be between 3 to 15 characters')
        .custom( async username => {
            let user = await User.findOne({username})
            if(user) {
                return Promise.reject('Username already in Used!')
            }
        })
        .trim(),

    body('email')
        .isEmail()
        .withMessage('Please Provide a Valid Email')
        .custom( async email => {
            let user = await User.findOne({email})
            if(user) {
                return Promise.reject('Email Already in Used!')
            }
        })
        .normalizeEmail(),

    body('password')
        .isLength({ min: 5 })
        .withMessage('Password Must be greater than 5 characters'),

    body('confirmpassword')
        .isLength({min: 5})
        .withMessage('Password Must be greater than 5 characters')
        .custom((confirmpassword, {req}) => {
            if(confirmpassword != req.body.password) {
                throw new Error('Password Does Not Match')
            }
            return true
        })    

]
