const express = require('express');
const router = express.Router();
// const User = require('../db/models/User');
const productsRoutes = require('./productRoutes');
const userRoutes = require('./userRoutes');

/* router.get('/', async (req, res, next) => {
    try {
        const userId = req.session.userId
        if(!userId){
            user.createGuest(req.session.id)
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
router.use('/user', userRoutes);

module.exports = router
