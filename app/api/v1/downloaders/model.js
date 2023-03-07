const Sequelize = require('sequelize');
const sequelize = require('../../../db');

const Downloaders = sequelize.define('downloaders', {
  id_user: {
    type: Sequelize.INTEGER,
    references: 'users',
    referencesKey: 'id'
  },
  id_campaign: {
    type: Sequelize.INTEGER,
    references: 'campaigns',
    referencesKey: 'id'
  }
});

Downloaders.sync();

module.exports = Downloaders;