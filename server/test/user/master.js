process.env.NODE_ENV = 'test';


//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
var server = require("../../app").server; 
let should = chai.should();

var userToken;

chai.use(chaiHttp);

describe('/GET languages', () => {
    it('it should GET all the languages', (done) => {
      chai.request(server)
          .get('/api/language')
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('responseData');
                res.body.responseData.should.have.property('languages');
                res.body.responseData.languages.should.be.a('array');
            done();
          });
    });
});
