const db = require('../server/db/index');
const Order = require('../server/db/models/Order')
const OrderProduct = require('../server/db/models/OrderProduct')
const Product = require('../server/db/models/Product')
require('dotenv').config();
const Session = require('../server/db/models/Session')
const User = require('../server/db/models/User')
const associations = require('../server/db/models/index')
const hash = require('./hash')

const users = [
    {id: '058007a1-144e-4b42-96fe-1a59482b9520', name: 'Katherine Peterson'},
    {id: '07fb06de-06ea-4231-81ce-f87de4b506c0', name: 'Hugo Campos'},
    {id: '4860421e-9925-401e-8556-bd15cd369b6b', name: 'Connor Stennett'},
    {id: '5b234fec-bda9-4ed7-a4b5-d126416f1bd9', name: 'Preston Wallace'},
    {id: '897346bc-e737-4571-9fef-0c2abdd67e03', name: 'Jonathan Mann'},
    {id: '94db118b-9fc2-4add-8582-4ae409933323', name: 'Eliot Szwajkowski'},
].map(user => {
    const nameArr = user.name.split(' ');
    const firstName = nameArr[0];
    const lastName = nameArr[1];
    const email = `${firstName}${lastName}@email.com`;
    const password = 'password1234';
    const id = user.id;
    return {id, firstName, lastName, email, password}
})

const products = [
    {id: '16e11d4d-6358-47bd-b252-438227de8a49', name: 'Standup Desk', description: 'a desk for standing while working', imageUrls: [''], price: 199.99, quantity: 100, category: 'office'},
    {id: '4ab7f9a4-3d03-445d-b222-e66b6ef0a6cd', name: 'Ergonomic Keyboard', description: 'an ergonomic keyboard', imageUrls: [''], price: 79.98, quantity: 100, category: 'office'},
    {id: '7c27b055-1187-49d0-aece-93deb97dffe8', name: 'Ergonomic Mouse', description: 'an ergonomic mouse', imageUrls: [''], price: 67.54, quantity: 100, category: 'office'},
    {id: 'b6c69306-ed81-488a-8edc-2b57dc07294c', name: 'Advil', description: 'ibuprofen', imageUrls: ['https://www.advil.com/sites/default/files/images/products/advil-tablets-new_0_0.png'], price: 3.49, quantity: 200, category: 'medication'},
    {id: 'caa4bf94-afcb-47c9-9f32-4914c1cc11a2', name: 'Acetaminophen', category: 'medication', aveRating:3.4, price:3.49, imageUrls:['https://upload.wikimedia.org/wikipedia/commons/8/8f/Paracetamol-from-xtal-3D-balls.png','https://en.wikipedia.org/wiki/Paracetamol#/media/File:Paracetamol-skeletal.svg'], description:'Paracetamol, also known as acetaminophen and APAP, is a medication used to treat pain and fever. It is typically used for mild to moderate pain relief. There is mixed evidence for its use to relieve fever in children. It is often sold in combination with other medications, such as in many cold medications. Paracetamol is also used for severe pain, such as cancer pain and pain after surgery, in combination with opioid pain medication. It is typically used either by mouth or rectally, but is also available by injection into a vein. Effects last between 2 to 4 hours.\nParacetamol is generally safe at recommended doses. The recommended maximum daily dose for an adult is 3 or 4 grams. Higher doses may lead to toxicity, including liver failure. Serious skin rashes may rarely occur. It appears to be safe during pregnancy and when breastfeeding. In those with liver disease, it may still be used, but in lower doses. It is classified as a mild analgesic. It does not have significant anti-inflammatory activity. How it works is not entirely clear. -Wikipedia', quantity:1},
    {id: 'f3015b76-0c17-42d1-a6a5-496385dc46a8', name: 'Eye drops', category: 'medication', aveRating:4.539, price:5.49, imageUrls:['https://upload.wikimedia.org/wikipedia/commons/6/60/%C3%96gondroppar2.jpg'], description: 'Five pack. Natural tears, dryness relief for your eyes.', quantity: 2}
];


async function syncAndSeed() {
    try {
        await db.sync({force: true});
        await Promise.all([users.map(user => User.create(user)), products.map(product => Product.create(product))]);
    } catch (err) {
        console.log(err);
    }
}

if(require.main === module) syncAndSeed();

module.exports = syncAndSeed;