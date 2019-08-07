const router = require('express').Router();
const Product = require('../db/models/Product');

router.route('/')
    .get(async (req, res, next) => {
        try {
            res.send(await Product.findAll());
        } catch (err){
            console.error(err);
        }
    })
    .post(async (req, res, next) => {
        try {
            res.send(await Product.create(req.body));
        } catch (err){
            console.error(err);
        }
    });

router.route('/:productId')
    .delete(async (req, res, next) => {
        try {
            res.send(await Product.destroy({
                where: {
                    id: req.params.id
                }
            }))
        } catch (err) {
            console.error(err);
        }
    })
    .put(async (req, res, next) => {
        try {
            const uProd = {}
            for(let key in req.body){
                uProd[key] = req.body
            }
            const product = await Product.update( uProd, {
                where: {
                    id: req.params.id
                }
            })
            res.send(product[0]);
        } catch (err){
            console.error(err);
        }
    });

module.exports = router;
