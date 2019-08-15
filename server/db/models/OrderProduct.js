const db = require('../connection');
const Sequelize = require('sequelize');

const OrderProduct = db.define('orderproduct', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    purchaseUnitPrice: {
        type: Sequelize.DECIMAL,
    },
    quantity: {
        type: Sequelize.INTEGER,
    },
});

module.exports = OrderProduct;