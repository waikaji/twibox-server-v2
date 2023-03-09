const Sequelize = require('sequelize');
const sequelize = require('../../../db');

const Campaigns = sequelize.define('campaigns', {
  id_user: {
    type: Sequelize.INTEGER,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  title: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.STRING,
  },
  url_slug: {
    type: Sequelize.STRING,
  },
  url_image: {
    type: Sequelize.STRING,
  }
}, {
  timestamps: true
});

Campaigns.sync();

module.exports = Campaigns;