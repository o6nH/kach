const router = require('express').Router();
const Order = require('../db/models/Order');
const OrderProduct = require('../db/models/OrderProduct');

router.route('/')
    .post(async (req, res, next) => {
        try {
            let currentCart = await Order.findOrCreate(
                    {
                        where: {
                                userId: req.body.userId,
                                status: 'inCart'
                            },
                    }
                );
            currentCart = currentCart[0].dataValues;
            console.log('CURRENT CART: ', currentCart)
            console.log('PRODUCT ID: ', req.body.id)
            console.log('ORDER ID: ', currentCart.id)
            const orderLine = await OrderProduct.findAll({
                where: {
                    productId: req.body.id,
                    orderId: currentCart.id
                }
            });
            console.log('ORDER LINE: ', orderLine)
            
            if (orderLine[0]) {
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
                    orderId: currentCart.id,
                    purchaseUnitPrice: req.body.price,
                    quantity: 1
                }
                )
            }
            res.send(req.body)
        } catch (err){
            console.error(err);
        }
    });

module.exports = router;