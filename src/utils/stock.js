const axios = require('axios');
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

module.exports = {
  getPrice,
  getStock,
  getUser,
};
