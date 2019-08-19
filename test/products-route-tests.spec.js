'use strict';

const { db } = require('../server/db'); //DB connection with models defined
const app = require('../server/index'); //Express server with routes
// const request = require('supertest'); //Supertest client making HTTP requests
const session = require('supertest-session'); //Supertest client making HTTP requests
const { expect } = require('chai'); //Assertions library

let mockSession = null;

before(() => db.sync({ force: true }));
after(() => db.close());

describe('Unauthorized Requests', () => {
    beforeEach(() => mockSession = session(app));
    afterEach(() => db.sync({ force: true }));

    describe('GET request to `/api/products`', () => {
        it('should respond with an array of products', () => {
            mockSession
                .get('/api/products')
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(res => 
                    expect(res.body).to.be.an('array')
                )
                .expect(res => 
                    expect(res.body.length).to.be.greaterThan(5)
                )
        });
    })

    describe('POST request to `/api/products`', () => {

        const product = {
            name: 'Dingus',
            quantity: 50,
            price: 9.99
        }

        it('should respond with created product object with an id', () => {
            mockSession
                .post('/api/products')
                .send(product)
                .expect(201)
                .expect('Content-Type', /json/)
                .expect((res) => {
                    expect(res.body).to.have.property('id') &&
                    expect(res.body).to.have.property('CreatedAt')
                })
        });

        it('should respond with products that have all expected properties', () => {
            mockSession
                .post('/api/products')
                .send(product)
                .expect(201)
                .expect(res => {
                    expect(Object.keys(res.body).to.include())
                })
        })
        it('should not create a product if the fields are empty')
    })

    describe('DELETE request', () => {
        it('should successfully delete a product', () => {
            app
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
            app
                .put('/api/products')
                .expect(202)
                .expect('Content-Type', /json/)
                .expect((res) => {
                    //expect(res.body).to.not.matchSnapshot()
                })
        })
    })
})
