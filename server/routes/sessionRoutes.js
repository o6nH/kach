const router = require('express').Router();
const { User } = require('../db/models/index');

router.use('/', async (req, res, next) => {
    try {
        const userId = req.session.userId
        if (!userId){
            const guestUser = await User.createGuest()
            req.session.userId = guestUser.id;
            res.status(201).send('User Created!');
        } else {
            const user = await User.findOne({
                where: {
                    id: userId
                }
            })

            const sendObj = {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                isAdmin: user.isAdmin,
                streetAddress: user.streetAddress,
                suite: user.suite,
                city: user.city,
                state: user.state,
                zip: user.zip,
                imageUrl: user.imageUrl,
                isAuthenticated: user.isAuthenticated
            }

            res.send(sendObj)
        }
    } catch (err){
        console.error(err);
    }
}) 

module.exports = router;
