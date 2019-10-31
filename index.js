'use strict';

const Hapi = require('@hapi/hapi');
// comment after first run
const db = require('./app/config/db.js');
var routes = require('./app/route');

const server = Hapi.server({
    port: 3300,
    host: '0.0.0.0'
});
// comment after first run
db.sequelize.sync({ force: true }).then(() => {
    initial();
});
// comment after first run
function initial() {
    db.role.create({
        id: 1,
        name: "USER"
    });

    db.role.create({
        id: 2,
        name: "ADMIN"
    });
}

const main = async () => {
    await server.route(routes);
    await server.start()
    return server
};

main().then(server => {
    console.log('Server running at:', server.info.uri)
}).catch(err => {
    console.log(err)
    process.exit(1)
})
