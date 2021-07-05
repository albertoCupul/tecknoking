const SchemaInventory = require('../../../public/javascript/modules/mongoDB/models/Products/inventory');

async function remove(id) {
  try {
    const Schema = new SchemaInventory();
    const filter = { _id: id };
    Schema.findOneAndRemove(filter);
    return true;
  } catch (error) {
    return false;
  }
}

module.exports = remove;
