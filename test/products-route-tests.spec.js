const { app } = require('./main-get-tests.spec')
const expect = require('chai').expect

const product = {
    name: 'Lettuce',
    price: 2.00,
    description: 'Very fresh green romaine lettuce!'
}

const updatedProduct = {
    name: 'Better Lettuce',
    price: 3.00,
    description: 'This lettuce is updated and better!'
}

describe('/api/products routes', () => {
    describe('/products GET URI', () => {
        it('should send a valid JSON response', () => {
            app
            .get('/products')
            .expect(200)
            .expect('Content-Type', /json/)
        })
    })

    describe('/products POST URI', () => {
        it('should create a product', () => {
            app
            .post('/api/products')
            .send(product)
            .expect(201)
            .expect('Content-Type', /json/)
            .expect((res) => {
                expect(res.body).to.matchSnapshot()
            })
        })
    })

    describe('/products DELETE URI', () => {
        it('should successfully delete a product', () => {
            app
            .delete(`/api/products/${product.id}`)
            .expect(204)
            .expect('Content-Type', /json/)
            .expect((res) => {
                expect(res.body).to.be.an('object')
            })
        })
    })

    describe('/products PUT URI', () => {
        it('should successfully update a product', (done) => {
            app
            .put('/api/products')
            .send(updatedProduct)
            .expect(202)
            .expect('Content-Type', /json/)
            .expect((res) => {
                expect(res.body.name).to.be.an('object')
            })
            .expect(done())
        })
    })
})
