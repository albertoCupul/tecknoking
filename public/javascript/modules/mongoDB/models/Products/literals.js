const mongoose = require('mongoose');

const { Schema } = mongoose;

const SchemaLiterals = new Schema({
  name: { type: String, required: true, unique: true },
  value: { type: Schema.Types.Decimal128, required: true },
  editable: { type: Boolean, required: true },
},
{
  collection: 'Literals',
});

SchemaLiterals.methods.findOneAndUpdate = (filter, data) => mongoose.model('Literals').findOneAndUpdate(filter, data).exec();

SchemaLiterals.methods.findOneAndRemove = (filter) => mongoose.model('Literals').findOneAndRemove(filter).exec();

SchemaLiterals.methods.find = () => mongoose.model('Literals').find().exec();

SchemaLiterals.methods.findOne = (filter) => mongoose.model('Literals').findOne(filter).exec();

module.exports = mongoose.model('Literals', SchemaLiterals);
