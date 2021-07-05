const SchemaRules = require('../../../public/javascript/modules/mongoDB/models/Products/rules');
const delRef = require('./delRef');
const addRef = require('./addRef');

async function edit(id, literalsArray) {
  try {
    const Schema = new SchemaRules();
    const filter = { _id: id };
    const rule = await Schema.findOne(filter);
    if (!rule) {
      return false;
    }

    let continuar = await delRef(rule);
    if (!continuar) {
      return false;
    }

    continuar = await addRef(id, literalsArray);
    if (!continuar) {
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
}

module.exports.edit = edit;
