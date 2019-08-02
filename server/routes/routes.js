const Product = require('Product model goes here');
const User = require('User model goes here');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: {
                sessionId: req.session.SID
            }
        })
        if (user){
            res.send(user)
        }
        next();
    } catch (err){
        console.error(err);
    }
})

router.get('/products', async (req, res, next) => {
    try {
        res.send(await Product.findAll());
    } catch (err){
        console.error(err);
    }
});

router.post('/products', async (req, res, next) => {
    try {
        res.send(await Product.create(req.body));
    } catch (err){
        console.error(err);
    }
});

router.delete('/products/:id', async (req, res, next) => {
    try {
        res.send(await Product.destroy({
        where: {
            id: req.params.id
        }
    }))
} catch (err){
    console.error(err);
}
});

router.put('/products/:id', async (req, res, next) => {
    try {
        const product = await Product.update({
            price: req.body.price
        }, {
            where: {
                id: req.params.id
            }
        })
        res.send(product[0]);
    } catch (err){
        console.error(err);
    }
});

router.get('/user:id', async (req, res, next) => {
    try {
        res.send(await User.findone({
        where: {
            id: req.params.id
        }
    }))
} catch (err){
    console.error(err);
}
})

router.post('/user', async (req, res, next) => {
    try {
        res.send(await User.create(req.body))
    } catch (err){
        console.error(err);
    }
})

router.delete('/user:id', async (req, res, next) => {
    try {
        res.send(await User.destroy({
            where: {
                id: req.params.id
            }
        }))
    } catch (err){
        console.error(err);
    }
})

// router.put('/user:id', async (req, res, next) => {
// })

module.exports = router
