const express = require('express');
const router = express.Router();
// const User = require('../db/models/User');
const productsRoutes = require('./productRoutes');
const orderRoutes = require('./orderRoutes');

/* router.get('/', async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: {
                sessionId: req.session.id
            }
        })
        if (user){
            res.send(user);
        } else {
            res.send(req.session);
        }
        next();
    } catch (err){
        console.error(err);
    }
}) */

router.use('/products', productsRoutes);
router.use('/orders', orderRoutes)

module.exports = router
