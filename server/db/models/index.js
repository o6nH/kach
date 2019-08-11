const Session = require('./Session');
const User = require('./User');
const Order = require('./Order');
const OrderProduct = require('./OrderProduct');
const Product = require('./Product');

User.hasMany(Order);
Order.belongsTo(User);

Order.hasMany(OrderProduct);
OrderProduct.belongsTo(Order);

Product.hasMany(OrderProduct);
OrderProduct.belongsTo(Product);

module.exports = {Session, User, Order, OrderProduct, Product};
// OrderProduct.belongsTo(Order);
// Order.hasMany(Product, {through: OrderProduct});

// OrderProduct.belongsTo(Product);
// Product.hasMany(Order, {through: OrderProduct});
