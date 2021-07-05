const SchemaRules = require('../../../public/javascript/modules/mongoDB/models/Products/rules');

async function remove(id) {
  try {
    const filter = { _id: id };
    const Schema = new SchemaRules();
    Schema.findOneAndRemove(filter);
    return true;
  } catch (error) {
    return false;
  }
}

module.exports.remove = remove;
