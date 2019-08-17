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
