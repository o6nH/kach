const express = require('express');
const router = express.Router();
const {User} = require('../db/models/index');

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

router.post('/signup', (req, res, next) => {
        const newUser = {
            id: req.session.userId,
        }
        for (let key in req.body) {
            if (key === req.body.isAdmin || key === req.body.isAuth ){
                return
            } else {
                newUser[key] = req.body[key]

            }
        }
        console.log('HIT ', newUser);
        User.signup(newUser)
        res.status(201).redirect('/');
})

router.get('/currentUser', async (req, res, next) => {
    try {
        res.send(await User.findOne({
                where: {
                    id: req.session.userId
                }
            }));
    } catch (err){
        console.error(err);
    }
})

router.delete('/:userId', async (req, res, next) => {
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
