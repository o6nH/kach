const router = require('express').Router();
const Order = require('../db/models/Order');
const Product = require('../db/models/Product');
const OrderProduct = require('../db/models/OrderProduct');

router.route('/')
    .post(async (req, res, next) => {
        try {
            let currentCart = await Order.findOrCreate(
                    {
                        where: {
                                userId: '058007a1-144e-4b42-96fe-1a59482b9520',
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
            let newLine = {};
            if (orderLine && orderLine[0]) {
                orderLine[0].dataValues.quantity++;
                [,[newLine]] = await OrderProduct.update(orderLine[0].dataValues,
                    {
                        where: {
                            id: orderLine[0].dataValues.id
                        },
                        returning: true
                    }) 
            } else {
                newLine = await OrderProduct.create(
                    {
                        productId: req.body.id,
                        orderId: currentCart.id,
                        purchaseUnitPrice: req.body.price,
                        quantity: 1
                    }
                )
                
            }
            const productFromLine = await Product.findByPk(newLine.productId)
            newLine.dataValues.product = productFromLine;
            res.send(newLine)

        } catch (err){
            console.error(err);
        }
    })
    .delete(async (req, res, next) => {
        try {
            let [currentCart] = await Order.findAll(
                {
                    where: {
                            userId: '058007a1-144e-4b42-96fe-1a59482b9520',
                            status: 'inCart'
                        },
                }
            );
            currentCart = currentCart.dataValues;

            let [orderLine] = await OrderProduct.findAll({
                where: {
                    productId: req.body.id,
                    orderId: currentCart.id
                }
            });

            orderLine = orderLine.dataValues;
            
            orderLine.quantity--;

            let changedLine = {};

            if (!orderLine.quantity) {
                changedLine = await OrderProduct.destroy({
                    where: {
                        productId: req.body.id,
                        orderId: currentCart.id
                    },
                    returning: true
                })
                res.send(orderLine);
            } else {
                [,[changedLine]] = await OrderProduct.update(orderLine,
                    {
                        where: {
                            id: orderLine.id
                        },
                        returning: true
                    }) 
                changedLine = changedLine.dataValues;
                const productFromLine = await Product.findByPk(changedLine.productId)
                changedLine.product = productFromLine.dataValues;
                res.send(changedLine)
            }
            
        } catch (err) {
            console.log(err);
        }
    })

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

            let orderLines = await OrderProduct.findAll({
                where: {
                    orderId: currentCart.id
                },
                include: {model: Product}
            });
            res.send(orderLines);
        } catch (err){
            console.error(err);
        }
    });

router.route('/checkout')
    .put(async (req, res, next) => {
        try {
            //TODO: bring in real userId
            
            const [,[placedOrder]] = await Order.update({
                    status: 'processing',
                }, 
                {
                    where: {
                            userId: '058007a1-144e-4b42-96fe-1a59482b9520',
                            status: 'inCart'
                        },
                    returning: true,
                }
            );
            
            placedOrder.orderedAt = placedOrder.updatedAt;

            await placedOrder.save();
            
            res.send(placedOrder)
        } catch (err){
            console.error(err);
        }
    });

module.exports = router;