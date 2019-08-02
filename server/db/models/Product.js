const db = require('../index');
const Sequelize = require('sequelize');

const Product = db.define('product', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    imageUrls: {
        type: Sequelize.ARRAY(Sequelize.STRING),
    },
    name: {
        type: Sequelize.STRING,
    },
    price: {
        type: Sequelize.DECIMAL,
    },
    quantity: {
        type: Sequelize.INTEGER,
    },
    category: {
        type: Sequelize.STRING,
    }
});

module.exports = Product;