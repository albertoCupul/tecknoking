const SchemaRules = require('../../../public/javascript/modules/mongoDB/models/Products/rules');

async function getAll(id) {
  try {
    const Schema = new SchemaRules();
    const filter = { _id: id };
    const rule = await Schema.findOnePopulate(filter);
    return rule;
  } catch (error) {
    return null;
  }
}

module.exports = getAll;
