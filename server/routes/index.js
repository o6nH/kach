const Product = require('Product model goes here');
const User = require('User model goes here');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res, next) => {
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

router.get('/user', async (req, res, next) => {
    try {
        res.send(await User.findone({
        where: {
            sessionId: req.session.id
        }
    }))
} catch (err){
    console.error(err);
}
})

router.post('/user', async (req, res, next) => {
    try {
        req.body.sessionId = req.session.id
        res.send(await User.create(req.body))
    } catch (err){
        console.error(err);
    }
})

router.delete('/user:id', async (req, res, next) => {
    try {
        res.send(await User.destroy({
            where: {
                sessionId: req.session.id
            }
        }))
    } catch (err){
        console.error(err);
    }
})

// router.put('/user:id', async (req, res, next) => {
// })

module.exports = router
