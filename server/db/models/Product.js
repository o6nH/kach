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
        allowNull: false,
    },
    price: {
        type: Sequelize.DECIMAL,
        allowNull: false,
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    category: {
        type: Sequelize.STRING,
    },
    description: {
        type: Sequelize.STRING(2000),
    },
    aveRating: {
        type: Sequelize.DECIMAL,
    }
});

Product.getCategories = function() {
    return this.findAll({
        attributes: ['category'],
    })
}


module.exports = Product;