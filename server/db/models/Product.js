const db = require('../index');
const Sequelize = require('sequelize');

const Product = db.define('product', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    imageUrl: {
        type: Sequelize.STRING,
    },
    name: {
        type: Sequelize.STRING,
    },
    price: {
        type: Sequelize.DECIMAL,
    },
    inventory: {
        type: Sequelize.INTEGER,
    },
});

module.exports = Product;