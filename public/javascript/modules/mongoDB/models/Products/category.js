const mongoose = require('mongoose');

const { Schema } = mongoose;

const SchemaCategory = new Schema({
  name: { type: String, required: true, unique: true },
},
{
  collection: 'Category',
});

SchemaCategory.methods.findOneAndUpdate = (filter, data) => mongoose.model('Category').findOneAndUpdate(filter, data).exec();

SchemaCategory.methods.findOneAndRemove = (filter) => mongoose.model('Category').findOneAndRemove(filter).exec();

SchemaCategory.methods.find = () => mongoose.model('Category').find().exec();

SchemaCategory.methods.findOne = (filter) => mongoose.model('Category').findOne(filter).exec();

module.exports = mongoose.model('Category', SchemaCategory);
