const mongoose = require('mongoose');

const { Schema } = mongoose;

const SchemaProduct = new Schema({
  manage: { type: Boolean, required: true },
  quantity: { type: Schema.Types.Decimal128, default: 0 },
  isPanel: { type: Boolean, required: true },
  width: { type: Schema.Types.Decimal128, default: 0 },
  height: { type: Schema.Types.Decimal128, default: 0 },
},
{
  collection: 'Inventory',
});

SchemaProduct.methods.findOneAndUpdate = (filter, data) => mongoose.model('Inventory').findOneAndUpdate(filter, data).exec();

SchemaProduct.methods.findOneAndRemove = (filter) => mongoose.model('Inventory').findOneAndRemove(filter).exec();

SchemaProduct.methods.findOne = (filter) => mongoose.model('Inventory').findOne(filter).exec();

SchemaProduct.methods.find = () => mongoose.model('Inventory').find().exec();

module.exports = mongoose.model('Inventory', SchemaProduct);
