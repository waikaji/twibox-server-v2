const Sequelize = require('sequelize');
const sequelize = require('../../../db');

const Categories = sequelize.define('categories', {
  name: {
    type: Sequelize.STRING,
  },
  status: {
    type: Sequelize.BOOLEAN,
  }
}, {
  timestamps: true,
});

Categories.sync();

module.exports = Categories;