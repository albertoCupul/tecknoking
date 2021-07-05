const SchemaRules = require('../../../public/javascript/modules/mongoDB/models/Products/rules');

async function create(name) {
  try {
    const Schema = new SchemaRules();
    Schema.name = name;
    await Schema.save();
    return true;
  } catch (error) {
    return false;
  }
}

module.exports.create = create;
