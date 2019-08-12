const router = require('express').Router();
const { User } = require('../db/models/index');

router.get('/', async (req, res, next) => {
    try {
        const userId = req.session.userId
        if (!userId){
            const guestUser = await User.createGuest(req.session.id)
            req.session.userId = guestUser.id;
            res.status(201).send("User Created!");
        } else {
            const user = await User.findOne({
                where: {
                    id: userId
                }
            })

            const sendObj = {
                id: user.id,
                firstName: user.firstName,
            }

            res.send(sendObj)
        }
        next();
    } catch (err){
        console.error(err);
    }
}) 

module.exports = router;
