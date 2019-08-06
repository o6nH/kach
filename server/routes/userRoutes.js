const router = require('./index');
const User = require('../db/models/User');
const crypto = require('crypto');

const secret = process.env.SECRET || 'abcdefg';
const hash = crypto.createHmac('sha256', secret)
                   .update('I love cupcakes')
                   .digest('hex');
console.log(hash);
// Prints:
//   c0fa1bc00531bd78ef38c628449c5102aeabd49b5dc3a2a516ea6ea959d6658e

router.put('/user/login', async (req, res, next) => {
    try {
            res.send(await User.findone({
        where: {
            username: req.body.username,
            password: hash(req.body.password)
        }
    }))

} catch (err){
    console.error(err);
}
})

router.post('/user/signup', async (req, res, next) => {
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
