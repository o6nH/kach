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
    {name: 'Advil', description: 'ibuprofen', imageUrls: ['https://www.advil.com/sites/default/files/images/products/advil-tablets-new_0_0.png'], price: 3.49, quantity: 200, category: 'medication'},
    {name: 'Acetaminophen', category: 'medication', aveRating:3.4, price:3.49, imageUrls:['https://upload.wikimedia.org/wikipedia/commons/8/8f/Paracetamol-from-xtal-3D-balls.png','https://en.wikipedia.org/wiki/Paracetamol#/media/File:Paracetamol-skeletal.svg'], description:'Paracetamol, also known as acetaminophen and APAP, is a medication used to treat pain and fever. It is typically used for mild to moderate pain relief. There is mixed evidence for its use to relieve fever in children. It is often sold in combination with other medications, such as in many cold medications. Paracetamol is also used for severe pain, such as cancer pain and pain after surgery, in combination with opioid pain medication. It is typically used either by mouth or rectally, but is also available by injection into a vein. Effects last between 2 to 4 hours.\nParacetamol is generally safe at recommended doses. The recommended maximum daily dose for an adult is 3 or 4 grams. Higher doses may lead to toxicity, including liver failure. Serious skin rashes may rarely occur. It appears to be safe during pregnancy and when breastfeeding. In those with liver disease, it may still be used, but in lower doses. It is classified as a mild analgesic. It does not have significant anti-inflammatory activity. How it works is not entirely clear. -Wikipedia', quantity:1},
    {name: 'Eye drops', category: 'medication', aveRating:4.539, price:5.49, imageUrls:['https://upload.wikimedia.org/wikipedia/commons/6/60/%C3%96gondroppar2.jpg'], description: 'Five pack. Natural tears, dryness relief for your eyes.', quantity: 2}
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

module.exports = syncAndSeed;