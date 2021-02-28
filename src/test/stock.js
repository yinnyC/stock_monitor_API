// test/posts.js
const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../server');

const agent = chai.request.agent(app);
const expect = chai.expect;

chai.should();
chai.use(chaiHttp);

describe('Stocks', function() {

  // Stock and user that we'll use for testing purposes
  const user = {
    username: 'poststest',
    password: 'testposts'
  };
};
