const db = require('../connection');
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
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    categories: {
        type: Sequelize.ARRAY(Sequelize.STRING),
    },
    description: {
        type: Sequelize.STRING(2000),
    },
    aveRating: {
        type: Sequelize.FLOAT,
    }
});

Product.getCategories = function() {
    const categoriesArr = this.findAll({
        attributes: ['categories'],
    });
    return categoriesArr.reduce((categories, catArr) => 
        [...categories, ...catArr]
    , [])
}


module.exports = Product;