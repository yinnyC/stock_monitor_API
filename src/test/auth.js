require('dotenv').config();
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const chai = require('chai');

chai.use(chaiHttp);

const server = require('../server');

const agent = chai.request.agent(server);
const should = chai.should();
const User = require('../models/user');

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

describe('User API endpoints', () => {
  it('should be able to signup', (done) => {
    User.findOneAndRemove({ username: 'testone' }, () => {
      agent
        .post('/auth/sign-up')
        .send({ username: 'testone', password: 'password' })
        .end((err, res) => {
          console.log(res.body);
          console.log(err);
          res.should.have.status(200);
          agent.should.have.cookie('nToken');
          done();
        });
    });
  });
  it('should not be able to login if they have not registered', (done) => {
    agent.post('/auth/login', { email: 'wrong@wrong.com', password: 'nope' }).end((err, res) => {
      res.status.should.be.equal(401);
      done();
    });
  });
  // logout
  it('should be able to logout', (done) => {
    agent.get('/auth/logout').end((err, res) => {
      res.should.have.status(200);
      agent.should.not.have.cookie('nToken');
      done();
    });
  });

  after((done) => {
    User.deleteOne({ username: 'testone' })
      .then(() => {
        agent.close();
        done();
      });
  });
});
