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

                userToken = JSON.parse(res.text).responseData.user.token;
            done();
          });
    });
});

describe('/Get Profile', () => {
    it('it should get user profile', (done) => {
      chai.request(server)
          .get('/api/profile')
          .set('Authorization', userToken)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('responseData');
                res.body.responseData.should.have.property('user');
                res.body.responseData.user.should.be.a('object');
            done();
          });
    });
});

describe('/Update Profile', () => {

    it('it should update profile', (done) => {
      chai.request(server)
          .post('/api/profile')
          .send({
            first_name: 'User', 
            last_name: 'Demo',
            email: 'demo@demo.com',
            mobile: '9876543210',
            city: '5909',
            headline: 'tssrt',
            description: 'test',
            state: "42"
            })
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('responseData');
                res.body.responseData.should.have.property('user');
                res.body.responseData.user.should.be.a('object');

                userToken = JSON.parse(res.text).responseData.user.token;
            done();
          });
    });
});
