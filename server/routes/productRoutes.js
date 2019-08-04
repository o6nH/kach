const router = require('./index');
const Product = require('../db/models/Product');

router.get('/products', async (req, res, next) => {
    try {
        res.send(await Product.findAll());
    } catch (err){
        console.error(err);
    }
});

router.post('/products', async (req, res, next) => {
    try {
        res.send(await Product.create(req.body));
    } catch (err){
        console.error(err);
    }
});

router.delete('/products/:productId', async (req, res, next) => {
    try {
        res.send(await Product.destroy({
        where: {
            id: req.params.id
        }
    }))
} catch (err){
    console.error(err);
}
});

router.put('/products/:productId', async (req, res, next) => {
    try {
        const uProd = {}
        for(let key in req.body){
            uProd[key] = req.body
        }
        const product = await Product.update( uProd, {
            where: {
                id: req.params.id
            }
        })
        res.send(product[0]);
    } catch (err){
        console.error(err);
    }
});

// router.put('/user:productId', async (req, res, next) => {
// })

module.exports = router;
