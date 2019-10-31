const Boom = require('@hapi/boom')
const db = require('../config/db.js');
const config = require('../config/config.js');
const User = db.user;

const Op = db.Sequelize.Op;

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

module.exports.register = async (request, h) => {
    const checkEmail = await User.findOne({
        where: {
            email: request.payload.email
        }
    }).catch(err => {
        return Boom.badRequest(err)
    })

    if (checkEmail === null) {
        const user = await User.create({
            name: request.payload.name,
            username: request.payload.username,
            email: request.payload.email,
            password: bcrypt.hashSync(request.payload.password, 8)
        }).catch(err => {
            return Boom.badRequest(err)
        })
        user.setRoles(1)
        return h.response({ status: 'success' }).code(201)
    } else {
        return h.response({status: 'Email already taken'})
    }

}
