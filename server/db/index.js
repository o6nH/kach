const Sequelize = require('sequelize');

const db = new Sequelize(
    process.env.DATABASE_URL || 'postgres://localhost/kach-grace-shopper',
    { logging: true }
  );

  
  module.exports = db;