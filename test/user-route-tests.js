const supertest = require('supertest')(require('../server/routes'))
const expect = require('chai').expect

describe('/api/user routes', () => {
    describe('/user/:id GET URI', () => {
        it('should fetch a user', () => {
            return supertest
                .get(`/api/user`)
        })
    })
})