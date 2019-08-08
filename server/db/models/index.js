const Order = require('./Order');
const Product = require('./Product');
const Session = require('./Session');
const User = require('./User');
const OrderProduct = require('./OrderProduct');

User.hasMany(Order);
Order.belongsTo(User);

Order.hasMany(OrderProduct);
OrderProduct.belongsTo(User);

Product.hasMany(OrderProduct);
OrderProduct.belongsTo(Product);

module.exports = {Order, Product, User, Session};