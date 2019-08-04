<<<<<<< HEAD
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
    const password = 'password1234';
    return {firstName, lastName, email, password}
})

const products = [
    {name: 'Standup Desk', description: 'a desk for standing while working', imageUrls: [''], price: 199.99, quantity: 100, category: 'office'},
    {name: 'Ergonomic Keyboard', description: 'an ergonomic keyboard', imageUrls: [''], price: 79.98, quantity: 100, category: 'office'},
    {name: 'Ergonomic Mouse', description: 'an ergonomic mouse', imageUrls: [''], price: 67.54, quantity: 100, category: 'office'},
    {name: 'Advil', description: 'ibuprofen', imageUrls: [''], price: 3.49, quantity: 200, category: 'drugs'},
];




async function syncAndSeed() {
    try {
        await db.sync({force: true});
        await Promise.all(users.map(user => User.create(user)));
        await Promise.all(products.map(product => Product.create(product)));
    } catch (err) {
        console.log(err);
    }
}

if(require.main === module) syncAndSeed();

=======
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

const products = [
    {name: 'Standup Desk', description: 'a desk for standing while working', imageUrls: [''], price: 199.99, quantity: 100, category: 'office'},
    {name: 'Ergonomic Keyboard', description: 'an ergonomic keyboard', imageUrls: [''], price: 79.98, quantity: 100, category: 'office'},
    {name: 'Ergonomic Mouse', description: 'an ergonomic mouse', imageUrls: [''], price: 67.54, quantity: 100, category: 'office'},
    {name: 'Advil', description: 'ibuprofen', imageUrls: [''], price: 3.49, quantity: 200, category: 'drugs'},
];




async function syncAndSeed() {
    try {
        await db.sync({force: true});
        await Promise.all(users.map(user => User.create(user)));
        await Promise.all(products.map(product => Product.create(product)));
    } catch (err) {
        console.log(err);
    }
}

if(require.main === module) syncAndSeed();

>>>>>>> 1258f0261b75b7858eb4023d654f37793668939c
module.exports = syncAndSeed;