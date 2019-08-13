const router = require('express').Router();
const { User } = require('../db/models/index');

router.use('/', async (req, res, next) => {
    try {
        const userId = req.session.userId
        if (!userId){
            const guestUser = await User.createGuest()
            req.session.userId = guestUser.id;
            console.log('re.session.userId ^^^^^^^ ', req.session.userId);
            res.status(201).send('User Created!');
        }
        next();
    } catch (err){
        console.error(err);
    }
}) 

module.exports = router;
