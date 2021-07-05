const mongoose = require('mongoose');

const { Schema } = mongoose;

const SchemaRules = new Schema({
  name: { type: String, required: true, unique: true },
  literals: [{
    id: { type: mongoose.Types.ObjectId, ref: 'Literals' },
    position: { type: Number },
  }],
},
{
  collection: 'Rules',
});

SchemaRules.methods.findOneAndUpdate = (filter, data) => mongoose.model('Rules').findOneAndUpdate(filter, data).exec();

SchemaRules.methods.findOneAndRemove = (filter) => mongoose.model('Rules').findOneAndRemove(filter).exec();

SchemaRules.methods.findOne = (filter) => mongoose.model('Rules').findOne(filter).exec();

SchemaRules.methods.find = () => mongoose.model('Rules').find().exec();

SchemaRules.methods.findOnePopulate = (filter) => mongoose.model('Rules').findOne(filter).populate('literals.id').exec();

module.exports = mongoose.model('Rules', SchemaRules);
