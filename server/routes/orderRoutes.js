const router = require('express').Router();
const Order = require('../db/models/Order');
const OrderProduct = require('../db/models/OrderProduct');

router.route('/:orderId')
    .post(async (req, res, next) => {
        try {
            const currentCart = await Order.findOrCreate(
                    {
                        where: {
                                id: req.userId,
                                status: 'inCart'
                            },
                        defaults: req.body
                    }
                );
            res.send(await OrderProduct.create())
        } catch (err){
            console.error(err);
        }
    });

module.exports = router;