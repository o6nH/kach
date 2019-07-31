const db = require('../index');
const Sequelize = require('sequelize');

const Session = db.define('session', {
    sid: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true,
        validate: {
          notEmpty: true
        }
      },
})

module.exports = Session;