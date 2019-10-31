// const { auth } = require('../controller/authController')
const loginController = require('../controller/loginController.js')
const registerController = require('../controller/registerController.js')

module.exports = [{
    method: 'POST',
    path: '/auth/login',
    handler: loginController.login
}, {
    method: 'POST',
    path: '/auth/register',
    handler: registerController.register
}
]
