const session = require('supertest-session');
const { app } = require('../server/index');
const expect = require('chai').expect;

let testSession = null;
const dummyUser = {
    email: 'dingus@gmail.com',
    userName: 'dingus',
    password: 'bigChungus'
}

beforeEach(() => {
    testSession = session(app);
})

describe('/api/user routes', () => {
    describe('/user GET URI for signup or login', () => {
        // it('should fail to access a restricted page', (done) => {
        //     testSession
        //     .get('/api/users')
        //     .expect(401)
        //     .end(done)
        // })
        it('should fetch a user successfully', (done) => {
            testSession
            .get(`/api/user/signin`)
            .send(dummyUser)
            .expect(200)
            .expect(res => {
                expect(res.body.userName).to.be.eql(dummyUser.userName)
            })
            .end(done)
        })
    })
})