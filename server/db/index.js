const db = require('./connection');
const {Session, User, Order, OrderProduct, Product} = require('./models/index');

module.exports = {db, Session, User, Order, OrderProduct, Product};