const Order = require('./Order');
const Product = require('./Product');
const User = require('./User');
const OrderProduct = require('./OrderProduct')

User.hasMany(Order);
Order.belongsTo(User);

Order.hasMany(OrderProduct);
OrderProduct.belongsTo(Order);

Product.hasMany(OrderProduct);
OrderProduct.belongsTo(Product);

// OrderProduct.belongsTo(Order);
// Order.hasMany(Product, {through: OrderProduct});

// OrderProduct.belongsTo(Product);
// Product.hasMany(Order, {through: OrderProduct});


module.exports = {Order, Product, User, OrderProduct};