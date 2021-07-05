const mongoose = require('mongoose');

const { Schema } = mongoose;

const SchemaProduct = new Schema({
  user: { type: String, required: true, unique: true },
  pwd: { type: String, required: true },
  logStatus: { type: String },
  idUser: { type: Schema.Types.ObjectId, ref: 'User' },
},
{
  collection: 'UsrAccess',
});

SchemaProduct.methods.findOneAndUpdate = (filter, data) => mongoose.model('UsrAccess').findOneAndUpdate(filter, data).exec();

SchemaProduct.methods.findOneAndRemove = (filter) => mongoose.model('UsrAccess').findOneAndRemove(filter).exec();

SchemaProduct.methods.findOne = (filter) => mongoose.model('UsrAccess').findOne(filter).exec();

SchemaProduct.methods.find = () => mongoose.model('UsrAccess').find().exec();

SchemaProduct.methods.findOnePopulate = (filter) => mongoose.model('UsrAccess').findOne(filter).populate('idUser').exec();

module.exports = mongoose.model('UsrAccess', SchemaProduct);
