const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PurchaseSchema = new Schema({
  price: Number,
  type: String,
  createdAt: Number
});
const PurchaseModel = mongoose.model('BithumbPurchase', PurchaseSchema);

module.exports = PurchaseModel;
