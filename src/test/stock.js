/* eslint-disable func-names */
/* eslint-disable no-undef */
/* eslint-disable prefer-arrow-callback */
// test/posts.js
require('dotenv').config();
const chaiHttp = require('chai-http');
const chai = require('chai');

const should = chai.should();
const { expect } = chai;

const Stock = require('../models/stock');
const User = require('../models/user');

const server = require('../server');

chai.use(chaiHttp);
const agent = chai.request.agent(server);

describe('Stocks API endpoints', function () {
  this.timeout(15000);
  // Stock and user that we'll use for testing purposes
  const sampleUser = {
    username: 'myUser',
    password: 'myUserpw',
  };
  const sampleSymbol1 = { symbol: 'CCIV' };
  const sampleSymbol2 = { symbol: 'DDOG' };
  before(function (done) {
    agent
      .post('/auth/sign-up')
      .send(sampleUser)
      .end((err, res) => {
        if (err) console.done(err);
        console.log(`In Before ${res.body.data}`);
        done();
      });
  });

  it('should load all message', (done) => {
    agent
      .get('/stock/watchlist')
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.status.should.be.equal(200);
        expect(res.body).to.be.an('array');
        return done();
      });
  });
  it('should be able return an updated stock price', (done) => {
    this.timeout(5000);
    agent
      .put('/stock/recentPrice')
      .send(sampleSymbol1)
      .then(function (err, res) {
        expect(res).to.have.status(200);
        done();
      }).catch(function (err) {
        console.log(err);
        done();
      });
  });
  it('should be able to delete stock form user\'s watchlist', (done) => {
    this.timeout(5000);
    agent
      .delete('/stock/remove')
      .send(sampleSymbol2)
      .end(function (err, res) {
        if (err) {
          return done(err);
        }
        expect(res).to.have.status(200);
        return done();
      });
  });
  after((done) => {
    // Delete all the testing data when the test is done
    Stock.deleteMany(sampleSymbol1)
      .then(() => {
        agent.close();
        User.findOneAndDelete({ username: sampleUser.username })
          .then(() => done())
          .catch((err) => done(err));
      });
  });
});
