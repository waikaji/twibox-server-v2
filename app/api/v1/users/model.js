const Sequelize = require('sequelize');
const sequelize = require('../../../db');

const Users = sequelize.define('users', {
  fullname: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
  status: {
    type: Sequelize.STRING,
  },
  url_image: {
    type: Sequelize.STRING,
  }
}, {
  timestamps: true,
});

Users.sync();

module.exports = Users;