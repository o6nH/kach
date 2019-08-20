'use strict';

const { db } = require('../server/db'); //DB connection with models defined
const syncAndSeed = require('../script/seed'); //Seed function with same DB connection
const app = require('../server/index'); //Express server with routes
// const request = require('supertest'); //Supertest client making HTTP requests
const session = require('supertest-session'); //Supertest client with session making HTTP requests
const { expect } = require('chai'); //Assertions library

let mockSession = null;
let authenticatedSession = null;    
//Product created by POST used in PUT and DELETE tests
const newProduct = {
    name: 'Dingus',
    quantity: 50,
    price: 9.99
}

before(async () => await syncAndSeed());
after(() => db.close());

describe('Authorized Product Requests', () => {
    //Login and get user
    before(function(done) {
        mockSession = session(app);
        mockSession.post('/api/users/login')
        .send({email: 'hugocampos@email.com', password:'password1234'})
        .then(function() {
            authenticatedSession = mockSession; //Note: mockSession becomes authenticated
            authenticatedSession.get('/api/users/currentUser')
            .then(function(res) {
                expect(res.body).to.include({
                    id: '07fb06de-06ea-4231-81ce-f87de4b506c0',
                    firstName: 'Hugo',
                    lastName: 'Campos',
                    email: 'hugocampos@email.com',
                    //TODO: password is not something that should be returned by api
                    // password: '1d4128bd51b1887223aee20dd49cb8b67f0488cd84d5fb9a9c1f6fbf21a23034',
                    streetAddress: '123 Fake St',
                    suite: 'A',
                    city: 'San Luis Obispo',
                    state: 'CA',
                    zip: 92555,
                    imageUrl: 'https://media.licdn.com/dms/image/C5603AQGoUpmO8mzxtg/profile-displayphoto-shrink_200_200/0?e=1571270400&v=beta&t=KHa3IIHYujLbs1iGhHVx8qKKyzIt_eV-QwjDkrblZoA',
                    isAdmin: true,
                    isAuthenticated: true
                })
                // console.log(res.body);
                done(); //Musth call done for async tests and hooks
            }, function(err){
                done(err);
            })
        }, function(err) {
            done(err);
        })
    })

    let createdProduct = null;
    let productId = null;

    describe('POST request to `/api/products`', () => {
        it('should respond with created newProduct object with an id', (done) => {
            authenticatedSession.post('/api/products').send(newProduct)
            .then(async res => {
                createdProduct = res.body
                productId = res.body.id //made available for PUT and DELETE tests
                console.log(productId);
                
                expect(200)
                expect('Content-Type', /json/)
                expect(res.body).to.include(newProduct).and.to.have.property('id');
                expect(res.body.id).to.not.be.equal(null);
                done();
                }, err => done(err))
        });

        it('should return with status 400 if req.body is empty', (done) => {
            authenticatedSession.post('/api/products').send()
            .then(res => {
                expect(res.status).to.equal(400);
                done();
            }, err => done(err))
        });
    })
    
    describe('GET request to `/api/products`', () => {
        it('should respond with an array of products', async () => {
            const res = await authenticatedSession.get('/api/products');
            expect(res.status).to.equal(200);
            expect('Content-Type', /json/);
            expect(res.body).to.be.an('array');
            expect(res.body).to.have.length(10);
            // console.log(res.body);
            //return res;
        });
        
        it('created products should be accessible through GET', async() => {
            const res = await authenticatedSession.get('/api/products');
            expect(res.body).to.deep.include(createdProduct);
        });
    })
    
    describe('PUT request to `/api/products/:id', () => {
        it('should successfully update a product name', async () => {
            const res = await authenticatedSession.put(`/api/products/${productId}`).send({name:'Doohickey'})
            expect(202);
            expect('Content-Type', /json/);
            expect(res.body.id).to.equal(productId);
            expect(res.body.name).to.equal('Doohickey');
        });

        it('should successfully update a product quantity and price', async () => {
            const res = await authenticatedSession.put(`/api/products/${productId}`).send({quantity:999, price: 49.79})
            expect(202);
            expect('Content-Type', /json/);
            expect(res.body.quantity).to.equal(999);
            expect(res.body.price).to.equal(49.79);
        }); 
    })
    
    describe('DELETE request to `/api/products/:id`', () => {
        it('should return and empty object with status 204', async () => {
            // console.log(await authenticatedSession.get(`/api/products/${productId}`));
            const res = await authenticatedSession.delete(`/api/products/${productId}`);
            expect(res.status).to.be.equal(204);
            expect(res.body).to.deep.equal({});
        });

        it('should delete a product from all products', async() => {
            const res = await authenticatedSession.get(`/api/products`);
            const products = res.body;
            expect(products).to.not.include(createdProduct);
        });
    })
})

describe('Unathenticated Product Requests', () => {

    before(() => {
        mockSession = session(app);
    });

    describe('POST requests to `/api/products`', () => {
        it('should be blocked and return status 401', async () => {
            const res = await mockSession.post(`/api/products`, newProduct);
            expect(401);
            expect(res.body).to.be.empty;
        });
    })
})