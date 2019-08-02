const supertest = require('supertest')(require('../server/routes/routes'))
const expect = require('chai').expect

const product = {
    name: 'Lettuce',
    price: 2.00,
    description: 'Very fresh green romaine lettuce!'
}

describe('Server', () => {
    describe('Routes', () => {
        describe('/products GET URI', () => {
            it('should send a valid JSON response', () => {
                return supertest
                    .get('/products')
                    .expect(200)
                    .expect('Content-Type', /json/)
            })
        })

        describe('/products POST URI', () => {
            it('should create a product', () => {
                return supertest
                    .post('/products')
                    .send(product)
                    .expect(201)
                    .expect('Content-Type', /json/)
                    .expect((res) => {
                        expect(res.body.name).to.eql()
                    })
            })
        })

        describe('/products DELETE URI', () => {
            it('should successfully delete a product', () => {
                return supertest
                    .delete(`/products/${product.id}`)
                    .expect(204)
            })
        })

        describe('/products PUT URI', () => {

        })
    })
})
