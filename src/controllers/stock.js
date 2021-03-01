/* ******************** */
//        Stock.js      *
/* ******************** */

require('dotenv').config();
const axios = require('axios');
const Stock = require('../models/stock');
const User = require('../models/user');

/* ******************** */
//   Helper Functions   *
/* ******************** */

const getPrice = (symbol) => new Promise((resolve, reject) => {
  // Making an API call from polygon.io
  axios.get(`https://api.polygon.io/v2/aggs/ticker/${symbol}/prev?unadjusted=true&apikey=${process.env.API_KEY}`)
    .then((response) => resolve(response.data.results[0].o))
    .catch((error) => reject(error));
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

/* ******************** */
//      Controllers     *
/* ******************** */

exports.getOneStock = (req, res) => {
  /* This controller will make an API call
  to get most recent stock price
  and update the stock price in db */
  if (req.user) {
    const { symbol } = req.body;
    axios.get(`https://api.polygon.io/v2/aggs/ticker/${symbol}/prev?unadjusted=true&apikey=${process.env.API_KEY}`)
      .then((response) => {
        const recentPrice = response.data.results[0].o;
        return Stock.findOneAndUpdate(symbol, recentPrice);
      })
      .then((updatedStock) => {
        updatedStock.save();
        return res.send(updatedStock);
      })
      .catch((err) => res.status(404).send({ message: err }));
  } else {
    console.log('You need to log in first');
    return res.status(401).send({ message: 'Log in to proceed ' });
  }
};

exports.getAllStock = (req, res) => {
  /* This controller will return all
  the stocks in user's watchlist  */
  if (req.user) {
    User.findById(req.user._id)
      .then((user) => res.send(user.stocks))
      .catch((error) => res.send({ message: `${error}` }));
  } else {
    console.log('You need to log in first');
    return res.status(401).send({ message: 'Log in to proceed ' });
  }
};

exports.removeStock = (req, res) => {
  /* This controller will remove a
  stock into user's watchlist */
  if (req.user) {
    const UserID = req.user._id
    Stock.findOne(req.body)
      .then((stockToRemove) => {
        const stockID = stockToRemove._id;
        return User.findByIdAndUpdate(UserID,
          { $pull: { stocks: stockID } });
      })
      .then((updatedUser) => {
        console.log(updatedUser);
        res.status(200).send({ message: 'Sucessfully Removed the Stock' });
      }).catch((err) => console.log(err));
  } else {
    console.log('You need to log in first');
    return res.status(401).send({ message: 'Log in to proceed ' });
  }
};

exports.addStock = (req, res) => {
  /* This controller will add a new
  stock into user's watchlist */
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
      if (user.stocks.indexOf(stock._id) === -1) {
        user.stocks.unshift(stock);
      }
      user.save();
      return res.send(user);
    });
  } else {
    console.log('You need to log in first');
    return res.status(401).send({ message: 'Log in to proceed ' });
  }
};
