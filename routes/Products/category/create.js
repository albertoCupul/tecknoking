const SchemaCategory = require('../../../public/javascript/modules/mongoDB/models/Products/category');

async function create(name) {
  try {
    const Schema = new SchemaCategory();
    Schema.name = name;
    await Schema.save();
    return true;
  } catch (error) {
    return false;
  }
}

module.exports = create;
