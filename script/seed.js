const db = require('../server/db/index');
const Order = require('../server/db/models/Order')
const Product = require('../server/db/models/Product')
const Session = require('../server/db/models/Session')
const User = require('../server/db/models/User')
const hash = require('./hash')

const users = [
    {name: 'Katherine Peterson'},
    {name: 'Hugo Campos'},
    {name: 'Connor Stennett'},
    {name: 'Preston Wallace'},
    {name: 'Jonathan Mann'},
    {name: 'Eliot Szwajkowski'},
].map(user => {
    const nameArr = user.name.split(' ');
    const firstName = nameArr[0];
    const lastName = nameArr[1];
    const email = `${firstName}${lastName}@email.com`;
    const password = hash('password1234');
    return {firstName, lastName, email, password}
})

const products = [];




async function syncAndSeed() {
    try {
        await db.sync({force: true});
        await Promise.all(users.map(user => User.create(user)));
    } catch (err) {
        console.log(err);
    }
}

if(require.main === module) syncAndSeed();

module.exports = syncAndSeed;