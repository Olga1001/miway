// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  category: String,
  name: String,
  count: Number,
  price: Number,
  unit: String,
});

module.exports = mongoose.model('Product', productSchema);
