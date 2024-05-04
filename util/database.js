const Sequelize = require('sequelize');

const sequelize = new Sequelize('node_exam', 'root', 'Radixweb8', {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3360
});

module.exports = sequelize;