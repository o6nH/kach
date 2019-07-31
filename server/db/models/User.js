const db = require('../index');
const Sequelize = require('sequelize');

const User = db.define('user', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    firstName: {
        type: Sequelize.STRING,
    },
    lastName: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
        validate: {
            isEmail: true
        }
    },
    username: {
        type: Sequelize.STRING,
    },
    password: {
        type: Sequelize.STRING,
    },
    address: {
        type: Sequelize.STRING,
    },
    imageUrl: {
        type: Sequelize.STRING,
    },
    isAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
    isAuthenticated: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
});

module.exports = User;