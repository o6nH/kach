const express = require('express');
const router = express.Router();
const productsRoutes = require('./productRoutes');
const userRoutes = require('./userRoutes');
const orderRoutes = require('./orderRoutes');
const sessionRoutes = require('./sessionRoutes');

router.use('/products', productsRoutes);
router.use('/users', userRoutes);
router.use('/orders', orderRoutes)

module.exports = router
