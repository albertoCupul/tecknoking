const SchemaRules = require('../../../public/javascript/modules/mongoDB/models/Products/category');

async function edit(id, name) {
  try {
    let filter = { name, _id: { $ne: id } };
    const Schema = new SchemaRules();
    const existRecord = await Schema.findOne(filter);
    if (existRecord) {
      return false;
    }
    filter = { _id: id };
    Schema.findOneAndUpdate(filter, { name });
    return true;
  } catch (error) {
    return false;
  }
}

module.exports = edit;
