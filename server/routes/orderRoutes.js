const router = require('express').Router();
const Order = require('../db/models/Order');
const OrderProduct = require('../db/models/OrderProduct');

router.route('/')
    .post(async (req, res, next) => {
        try {
            const currentCart = await Order.findOrCreate(
                    {
                        where: {
                                userId: req.body.userId,
                                status: 'inCart'
                            },
                    }
                );
            console.log('CURRENT CART: ', currentCart[0].dataValues)
            console.log('PRODUCT ID: ', req.body.id)
            const orderLine = await OrderProduct.findAll({
                where: {
                    productId: req.body.id,
                    orderId: currentCart[0].dataValues.id
                }
            });
            console.log('ORDER LINE: ', orderLine)
            
            if (orderLine) {
                orderLine[0].dataValues.quantity++;
                await OrderProduct.update(orderLine[0].dataValues,
                {
                    where: {
                        id: orderLine[0].dataValues.id
                    }
                })  
            } else {
                await OrderProduct.create(
                {
                    productId: req.body.id,
                    purchaseUnitPrice: req.body.price,
                    quantity: 1
                }
                )
            }
        } catch (err){
            console.error(err);
        }
    });

module.exports = router;