const db = require('../server/db/index');
const User = require('../server/db/models/User')

async function syncAndSeed() {
    try {
        await db.sync({force: true});
        User.create({
            firstName: 'Katherine',
            lastName: 'Peterson',
            email: 'katherine.peterson@yahoo.com',
            password: 'password',
        })
    } catch (err) {
        console.log(err);
    }
}

syncAndSeed();


module.exports = syncAndSeed;