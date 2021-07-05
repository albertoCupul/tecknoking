const SchemaRules = require('../../../public/javascript/modules/mongoDB/models/Products/literals');
const isEditable = require('./isEditable');

async function remove(id) {
  try {
    const Schema = new SchemaRules();

    const isEditLiteral = await isEditable(id, Schema);
    if (!isEditLiteral) return false;

    const filter = { _id: id };
    Schema.findOneAndRemove(filter);
    return true;
  } catch (error) {
    return false;
  }
}

module.exports.remove = remove;
