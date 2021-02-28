require('dotenv').config();
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const chai = require('chai');

chai.use(chaiHttp);

const should = chai.should();

const server = require('../server');

const User = require('../models/user');

const agent = chai.request.agent(server);

chai.config.includeStack = true;

/**
 * root level hooks
 */
after((done) => {
  // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
  mongoose.models = {};
  mongoose.modelSchemas = {};
  mongoose.connection.close();
  done();
});

const SAMPLE_USER_ID = 'aaaaaaaaaaaa'; // 12 byte string

describe('User API endpoints', () => {
  it('should be able to signup', (done) => {
    User.findOneAndRemove({ username: 'testone' }, () => {
      agent
        .post('/sign-up')
        .send({ username: 'testone', password: 'password' })
        .end((err, res) => {
          console.log(res.body);
          res.should.have.status(200);
          agent.should.have.cookie('nToken');
          done();
        });
    });
  });
  it('should not be able to login if they have not registered', (done) => {
    agent.post('/login', { email: 'wrong@wrong.com', password: 'nope' }).end((err, res) => {
      res.status.should.be.equal(401);
      done();
    });
  });
  // login
  it('should be able to login', (done) => {
    agent
      .post('/login')
      .send({ username: 'testone', password: 'password' })
      .end((err, res) => {
        res.should.have.status(200);
        agent.should.have.cookie('nToken');
        done();
      });
  });
  // logout
  it('should be able to logout', (done) => {
    agent.get('/logout').end((err, res) => {
      res.should.have.status(200);
      agent.should.not.have.cookie('nToken');
      done();
    });
  });

  after((done) => {
    User.deleteMany({ })
      .then(() => {
        agent.close();
        done();
      });
  });
});
