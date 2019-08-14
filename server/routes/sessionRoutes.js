const router = require('express').Router();
const { User } = require('../db/models/index');

router.use('/', async (req, res, next) => {
    try {
        console.log(req.session.userId)
        if (!req.session.userId){
            const guestUser = await User.create();
            req.session.userId = guestUser.id;
        }

        console.log(req.session.userId);
        next();
    } catch (err){
        throw err;
    }
}) 

module.exports = router;
