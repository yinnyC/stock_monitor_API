const mongoose = require('mongoose');
const { Schema } = mongoose;

const StockSchema = new Schema({
  symbol: { type: String, require: true },
  price: { type: String, require: true },
},
{ timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Stock', StockSchema);
