const Boom = require('@hapi/boom')
const db = require('../config/db.js');
const config = require('../config/config.js');
const User = db.user;

const Op = db.Sequelize.Op;

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

module.exports.login = async (request, h) => {
    const user = await User.findOne({
        where: {
            email: request.payload.email
        }
    }).catch(err => {
        return Boom.badRequest(err)
    });
    
    if (user !== null) {
        var passwordIsValid = bcrypt.compareSync(request.payload.password, user.password);
        
        if (!passwordIsValid) {
            return Boom.badRequest('Login failed')
        }

        var token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });

        return h.response({ auth: true, type: "Bearer", accessToken: token }).code(200)

    } else {
        return h.response({status: 'Login failed!'})
    }

}

