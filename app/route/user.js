// const { auth } = require('../controller/authController')
const Boom = require('@hapi/boom')
const db = require('../config/db.js');
const config = require('../config/config.js');
const User = db.user;
const Role = db.role;
const usersController = require('../controller/usersController.js')
const Op = db.Sequelize.Op;

var jwt = require('jsonwebtoken');

module.exports = [{
    method: 'GET',
    path: '/users',
    handler: usersController.users
}]

