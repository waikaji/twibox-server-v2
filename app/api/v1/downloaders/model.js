const Sequelize = require('sequelize');
const sequelize = require('../../../db');

const Downloaders = sequelize.define('downloaders', {
  id_campaign: {
    type: Sequelize.INTEGER,
    references: {
      model: 'campaigns',
      key: 'id'
    }
  }
},
{ timestamps: true });

Downloaders.sync();

module.exports = Downloaders;