const { Sequelize } = require('sequelize');

const { dbName, dbUsername, dbPassword, dbHost } = require('../config');

const sequelize = new Sequelize(dbName, dbUsername, dbPassword, {
  host: dbHost,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

module.exports = sequelize;

