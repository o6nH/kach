const db = require('../index');
const Sequelize = require('sequelize');

const OrderProduct = db.define('orderproduct', {
    purchaseUnitPrice: {
        type: Sequelize.DECIMAL,
    },
    quantity: {
        type: Sequelize.INTEGER,
    },
});

module.exports = OrderProduct;