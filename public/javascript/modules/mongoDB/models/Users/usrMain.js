const mongoose = require('mongoose');

const { Schema } = mongoose;

const SchemaProduct = new Schema({
  name: { type: String, required: true, index: true },
  first: { type: String, required: true, index: true },
  second: { type: String, index: true },
  phone: { type: String },
  registerDate: { type: Date, default: Date.now },
},
{
  collection: 'User',
});

SchemaProduct.methods.findOneAndUpdate = (filter, data) => mongoose.model('User').findOneAndUpdate(filter, data).exec();

SchemaProduct.methods.findOneAndRemove = (filter) => mongoose.model('User').findOneAndRemove(filter).exec();

SchemaProduct.methods.findOne = (filter) => mongoose.model('User').findOne(filter).exec();

SchemaProduct.methods.find = () => mongoose.model('User').find().exec();

module.exports = mongoose.model('User', SchemaProduct);
