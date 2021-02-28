require('dotenv').config();
const axios = require('axios');
const Stock = require('../models/stock');
const User = require('../models/user');

const getPrice = (symbol) => new Promise((resolve, reject) => {
  axios.get(`https://api.polygon.io/v2/aggs/ticker/${symbol}/prev?unadjusted=true&apikey=${process.env.API_KEY}`)
    .then((response) => {
      console.log(`In getPrice ${response.data}`);
      resolve(response.data.results[0].o);
    })
    .catch((error) => {
      console.log(`In getPrice ${error}`);
      reject(error);
    });
});
const getStock = (symbol) => new Promise((resolve, reject) => {
  Stock.findOne(symbol)
    .then((checkStock) => resolve(checkStock))
    .catch((error) => reject(error));
});
const getUser = (userID) => new Promise((resolve, reject) => {
  User.findById(userID)
    .then((checkUser) => resolve(checkUser))
    .catch((error) => reject(error));
});

exports.addStock = (req, res) => {
  if (req.user) {
    Promise.all([getStock(req.body),
      getPrice(req.body.symbol),
      getUser(req.user._id)]).then(([stock, price, user]) => {
      if (stock === null) {
        const newStock = new Stock(req.body);
        newStock.price = price;
        newStock.save();
        user.stocks.unshift(newStock);
        return res.send(user.save());
      }
      stock.price = price;
      stock.save();
      user.stocks.unshift(stock);
      user.save();
      return res.send(user);
    });
  } else {
    console.log('You need to log in first');
    return res.status(401).send({ message: 'Log in to proceed ' });
  }
};
