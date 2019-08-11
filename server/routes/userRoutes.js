const express = require('express');
const router = express.Router();
const User = require('../db/models/User');

router.post('/login', async (req, res, next) => {
    try {
        const user =  await User.login(req.body.email, req.body.password);
        if (!user){
            res.status(401).send('Email or password incorrect');
        } else {
        req.session.userId = user.id;
        req.session.orderId = user.orderId;
        res.send(user);
         }
    } catch (err) {
        console.error(err);
    }
    })

router.post('/signup', async (req, res, next) => {
    try {
        req.body.sessionId = req.session.id
        await User.signup(req.body)
        res.send('It Worked!');
    } catch (err){
        console.error(err);
    }
})

router.delete('/user/:userId', async (req, res, next) => {
    try {
        res.send(await User.destroy({
            where: {
                sessionId: req.session.id
            }
        }))
    } catch (err){
        console.error(err);
    }
});

module.exports = router;
