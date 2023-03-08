const Sequelize = require('sequelize');
const sequelize = require('../../../db');

const Downloaders = sequelize.define('downloaders', {
  id_user: {
    type: Sequelize.INTEGER,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  id_campaign: {
    type: Sequelize.INTEGER,
    references: {
      model: 'campaigns',
      key: 'id'
    }
  }
});

Downloaders.sync();

module.exports = Downloaders;