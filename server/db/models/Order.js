const {db} = require('../connection');
const Sequelize = require('sequelize');

const Order = db.define('order', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    orderedAt: {
        type: Sequelize.DATE,
    },
    status: {
        type: Sequelize.ENUM('inCart', 'processing', 'cancelled', 'shipping', 'delivered'),
        defaultValue: 'inCart',
    },
});


module.exports = Order;