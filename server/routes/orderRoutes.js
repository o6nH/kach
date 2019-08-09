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
            const orderLine = await OrderProduct.findAll({
                where: {
                    productId: req.body.id,
                    orderId: currentCart.id
                }
            });
            
            if (orderLine[0]) {
                orderLine[0].dataValues.quantity++;
                await OrderProduct.update(orderLine[0].dataValues,
                    {
                        where: {
                            id: orderLine[0].dataValues.id
                        }
                    })  
            } else {
                const newLine = await OrderProduct.create(
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

router.route('/cart')
    .get(async (req, res, next) => {
        try {
            //TODO: bring in real userId
            let currentCart = await Order.findOrCreate(
                {
                    where: {
                            userId: '058007a1-144e-4b42-96fe-1a59482b9520',
                            status: 'inCart'
                        },
                }
            );
            currentCart = currentCart[0].dataValues;
            console.log('current cart: ', currentCart)

            let orderLines = await OrderProduct.findAll({
                where: {
                    orderId: currentCart.id
                }
            });
            orderLines = orderLines[0].dataValues;
            console.log('orderLines: ', orderLines);
            res.send(orderLines);
        } catch (err){
            console.error(err);
        }
    });

module.exports = router;