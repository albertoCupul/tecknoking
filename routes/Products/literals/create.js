const SchemaRules = require('../../../public/javascript/modules/mongoDB/models/Products/literals');

async function create(name, value) {
  try {
    const Schema = new SchemaRules();
    Schema.name = name;
    Schema.value = value;
    Schema.editable = 1;
    await Schema.save();
    return true;
  } catch (error) {
    return false;
  }
}

module.exports.create = create;
