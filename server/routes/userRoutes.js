const express = require('express');
const router = express.Router();
const {User} = require('../db/index');
const hash = require('../../script/hash');

router.post('/login', async (req, res, next) => {
    try {
        const guestToDestroy = req.session.userId
        if ( guestToDestroy.orderId && guestToDestroy.email === null ){
            console.log('In the if statement!')
            await User.update(
                {
                    orderId: guestToDestroy.orderId
                },
                {
                where: {
                    email: req.body.email,
                    password: hash(req.body.password)
                }
            }
            )
        }
        const user =  await User.findOne({
            where: {
                email: req.body.email,
                password: hash(req.body.password)
            }
        });
        if (!user){
            res.status(401).send('Email or password incorrect');
        } else {
        req.session.userId = user.id;
        if (user.orderId){
            req.session.orderId = user.orderId
        }
         await User.destroy({
            where: {
                id: guestToDestroy
            }
        })
        res.redirect('/')
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

router.get('/signout', (req, res, next) => {
    if (req.session){
        req.session.destroy( err => {
            if (err){
                next(err)
            } else {
                return res.redirect('/');
            }
        });
    }
})

module.exports = router;
