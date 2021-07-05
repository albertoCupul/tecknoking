const mongoose = require('mongoose');

const { Schema } = mongoose;

const SchemaProduct = new Schema({
  name: { type: String, required: true, index: true },
  sku: { type: String, required: true, unique: true },
  precioCosto: { type: Schema.Types.Decimal128, required: true },
  precioVenta: { type: Schema.Types.Decimal128, required: true },
  idRule: { type: Schema.Types.ObjectId, index: true, ref: 'Rules' },
  includeIVA: { type: Boolean, required: true },
  isComplement: { type: Boolean, required: true },
  idCategory: {
    type: Schema.Types.ObjectId, index: true, required: true, ref: 'Category',
  },
  attributes: [{
    name: String,
    value: String,
  }],
  inventory: { type: Schema.Types.ObjectId, ref: 'Inventory' },
  offer: [{ type: Schema.Types.ObjectId, ref: 'Offer' }],
},
{
  collection: 'Product',
});

SchemaProduct.methods.findOneAndUpdate = (filter, data) => mongoose.model('Product').findOneAndUpdate(filter, data).exec();

SchemaProduct.methods.findOneAndRemove = (filter) => mongoose.model('Product').findOneAndRemove(filter).exec();

SchemaProduct.methods.findOne = (filter) => mongoose.model('Product').findOne(filter).exec();

SchemaProduct.methods.find = () => mongoose.model('Product').find().exec();

SchemaProduct.methods.findOnePopulate = (filter) => mongoose.model('Product').findOne(filter).populate('inventory').populate('offer')
  .populate('idCategory')
  .populate('idRule')
  .exec();

module.exports = mongoose.model('Product', SchemaProduct);
