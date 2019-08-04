const supertest = require('supertest')(require('../server/routes'))
const expect = require('chai').expect

describe('Server', () => {
    describe('Main GET Route', () => {
        it('checks to see if the user already exists', () => {
            return supertest
        })
    })
})

// describe('/api/products routes', () => {
//     describe('/products GET URI', () => {
//         it('should send a valid JSON response', () => {
//             return supertest
//                 .get('/products')
//                 .expect(200)
//                 .expect('Content-Type', /json/)
//         })
//     })

//     describe('/products POST URI', () => {
//         it('should create a product', () => {
//             return supertest
//                 .post('/api/products')
//                 .send(product)
//                 .expect(201)
//                 .expect('Content-Type', /json/)
//                 .expect((res) => {
//                     expect(res.body).to.matchSnapshot()
//                 })
//         })
//     })

//     describe('/products DELETE URI', () => {
//         it('should successfully delete a product', () => {
//             return supertest
//                 .delete(`/api/products/${product.id}`)
//                 .expect(204)
//                 .expect('Content-Type', /json/)
//                 .expect((res) => {
//                     expect(res.body).to.an('object')
//                 })
//         })
//     })

//     describe('/products PUT URI', () => {
//         it('should successfully update a product', () => {
//             return supertest
//                 .put('/api/products')
//                 .expect(202)
//                 .expect('Content-Type', /json/)
//                 .expect((res) => {
//                     //expect(res.body).to.not.matchSnapshot()
//                 })
//         })
//     })
// })

module.exports = {
    supertest,
}
