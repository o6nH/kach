const Order = require('./Order');
const Product = require('./Product');
const User = require('./User');

User.hasMany(Order);
Order.belongsTo(User);

Order.hasMany(Product);
Product.hasMany(Order);

module.exports = {Order, Product, User};