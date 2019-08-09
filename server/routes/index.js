const express = require('express');
const router = express.Router();
const productsRoutes = require('./productRoutes');
const userRoutes = require('./userRoutes');
const { User } = require('../db/models/index');
const orderRoutes = require('./orderRoutes');

router.get('/sessions', async (req, res, next) => {
    try {
        const userId = req.session.userId
        if (!userId){
            const guestUser = await User.createGuest(req.session.id)
            req.session.userId = guestUser.id;
            res.status(201).send("User Created!");
        } else {
            const user = await User.findOne({
                where: {
                    id: userId
                }
            })

            const sendObj = {
                id: user.id,
                firstName: user.firstName,
                
            }

            res.send()
        }
        next();
    } catch (err){
        console.error(err);
    }
}) 

router.use('/products', productsRoutes);
router.use('/users', userRoutes);
router.use('/orders', orderRoutes)

module.exports = router
