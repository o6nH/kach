const router = require('express').Router();
const { User } = require('../db/models/index');

router.use('/', async (req, res, next) => {
    try {
        if (!req.session.userId){
            const guestUser = await User.create();
            req.session.userId = guestUser.id;
        }
        next();
    } catch (err){
        next(err);
    }
}) 

module.exports = router;
