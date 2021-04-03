process.env.NODE_ENV = 'test';


//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
var server = require("../../app").server; 
let should = chai.should();

var userToken;

chai.use(chaiHttp);

describe('/login', () => {

    it('it should login', (done) => {
      chai.request(server)
          .post('/api/login')
          .send({
            email: 'demo@demo.com', 
            password: '123456'
            })
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('responseData');
                res.body.responseData.should.have.property('user');
                res.body.responseData.user.should.be.a('object');

            done();
          });
    });

    it('it should unauthorized', (done) => {
      chai.request(server)
          .post('/api/login')
          .send({
            email: 'demo@demo.com', 
            password: '1234567'
            })
          .end((err, res) => {
                res.should.have.status(422);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
            done();
          });
    });

    it('it should Without Email', (done) => {
      chai.request(server)
          .post('/api/login')
          .send({
            password: '1234567'
            })
          .end((err, res) => {
                res.should.have.status(422);
                res.body.should.be.a('object');
                res.body.should.have.property('error');
                res.body.error.should.have.property('email');
            done();
          });
    });

});