const mongoose = require('mongoose');

const { Schema } = mongoose;

const SchemaOffer = new Schema({
  name: { type: String, required: true, unique: true },
  quantity: { type: Schema.Types.Decimal128, required: true, default: 0 },
  gift: { type: Schema.Types.ObjectId },
  giftQuantity: { type: Schema.Types.Decimal128, default: 0 },
  newPrice: { type: Schema.Types.Decimal128, default: 1, required: true },
  startDate: { type: Date, default: Date.now, required: true },
  endDate: { type: Date },
},
{
  collection: 'Offer',
});

SchemaOffer.methods.findOneAndUpdate = (filter, data) => mongoose.model('Offer').findOneAndUpdate(filter, data).exec();

SchemaOffer.methods.findOneAndRemove = (filter) => mongoose.model('Offer').findOneAndRemove(filter).exec();

SchemaOffer.methods.findOne = (filter) => mongoose.model('Offer').findOne(filter).exec();

SchemaOffer.methods.find = () => mongoose.model('Offer').find().exec();

module.exports = mongoose.model('Offer', SchemaOffer);
