const db = require('../index');
const Sequelize = require('sequelize');

const Order = db.define('order', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    orderDate: {
        type: Sequelize.DATE,
    },
    orderTime: {
        type: Sequelize.TIME,
    },
    status: {
        type: Sequelize.ENUM('inCart', 'processing', 'cancelled', 'shipping', 'delivered'),
        defaultValue: 'inCart',
    },
});

module.exports = Order;