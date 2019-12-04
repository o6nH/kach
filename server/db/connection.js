const Sequelize = require('sequelize');

const db = new Sequelize(
    // eslint-disable-next-line no-undef
    process.env.DATABASE_URL || 'postgres://localhost/kach-grace-shopper',
    { logging: false }
  );

module.exports = db;