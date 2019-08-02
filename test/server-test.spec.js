const supertest = require('supertest')(require('../server/routes/routes'))
const expect = require('chai').expect

const product = {
    name: 'Lettuce',
    price: 2.00,
    description: 'Very fresh green romaine lettuce!'
}

describe('Server', () => {
    describe('Routes', () => {
        describe('/api/products routes', () => {
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
                    return supertest
                        .delete(`/api/products/${product.id}`)
                        .expect(204)
                        .expect('Content-Type', /json/)
                        .expect((res) => {
                            expect(res.body).to.an('object')
                        })
                })
            })

            describe('/products PUT URI', () => {
                it('should successfully update a product', () => {
                    return supertest
                        .put('/api/products')
                        .expect(202)
                        .expect('Content-Type', /json/)
                        .expect((res) => {
                            //expect(res.body).to.not.matchSnapshot()
                        })
                })
            })
        })

        describe('/api/user routes', () => {
            describe('/user/:id GET URI', () => {
                it('should fetch a user', () => {
                    return supertest
                        .get(`/api/user`)
                })
            })
        })
    })
})