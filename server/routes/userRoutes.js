const router = require('./index');
const User = require('../db/models/User');

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
