const db = require('../index');
const Sequelize = require('sequelize');

const OrderProduct = db.define('orderproduct', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    productId: {
        type: Sequelize.UUID,
    },
    orderId: {
        type: Sequelize.UUID,
    },
    purchaseUnitPrice: {
        type: Sequelize.DECIMAL,
    },
    quantity: {
        type: Sequelize.INTEGER,
    },
});

module.exports = OrderProduct;