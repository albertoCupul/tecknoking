const SchemaRules = require('../../../public/javascript/modules/mongoDB/models/Products/products');

async function getList() {
  try {
    const Schema = new SchemaRules();
    const list = await Schema.find();
    return list;
  } catch (error) {
    return null;
  }
}

module.exports = getList;
