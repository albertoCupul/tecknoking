const SchemaRules = require('../../../public/javascript/modules/mongoDB/models/Products/literals');
const isEditable = require('./isEditable');

async function edit(id, name, value) {
  try {
    let filter = { name, _id: { $ne: id } };
    const Schema = new SchemaRules();
    const existRecord = await Schema.findOne(filter);
    if (existRecord) {
      return false;
    }

    const isEditLiteral = await isEditable(id, Schema);
    if (!isEditLiteral) return false;

    filter = { _id: id };
    Schema.findOneAndUpdate(filter, { name, value });
    return true;
  } catch (error) {
    return false;
  }
}

module.exports.edit = edit;
