const SchemaRules = require('../../../public/javascript/modules/mongoDB/models/Products/category');

async function getOne(id) {
  try {
    const Schema = new SchemaRules();
    const filter = { _id: id };
    const category = await Schema.findOne(filter);
    return category;
  } catch (error) {
    return null;
  }
}

module.exports = getOne;
