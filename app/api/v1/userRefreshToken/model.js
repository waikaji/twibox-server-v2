const Sequelize = require('sequelize');
const sequelize = require('../../../db');

const UserRefreshToken = sequelize.define('userRefreshToken', {
  refreshToken: {
    type: Sequelize.STRING,
  },
  id_user: {
    type: Sequelize.INTEGER,
    references: {
      model: 'users',
      key: 'id'
    }
  }
}, {
  timestamps: true
})

UserRefreshToken.sync();

module.exports = UserRefreshToken;