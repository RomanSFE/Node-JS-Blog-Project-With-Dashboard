const { body } = require('express-validator')
const validator = require('validator')

const linkValidator = value => {
    if(value) {
        if(!validator.isURL(value)) {
            throw new Error('Please provide valid URL')
        }
    }
    return true
}

module.exports = [
    body('name')
        .not().isEmpty().withMessage('Name can not be empty')
        .isLength({max: 40}).withMessage('Name can not be more than 50 characters')
        .trim(),

    body('title')
        .not().isEmpty().withMessage('Title can not be empty')
        .isLength({max: 100}).withMessage('Title can not be more than 100 characters')
        .trim(),

    body('bio')
        .not().isEmpty().withMessage('Bio can not be empty')
        .isLength({max: 500}).withMessage('Bio can not be more than 500 characters')
        .trim(),

    body('website')
        .custom(linkValidator),

    body('facebook')
        .custom(linkValidator),

    body('twitter')
        .custom(linkValidator),

    body('github')
        .custom(linkValidator),
]


// body('website')
//         .custom(value => {
//             if(value) {
//                 if(!validator.isURL(value)) {
//                     throw new Error('Please provide valid URL')
//                 }
//             }
//         }),