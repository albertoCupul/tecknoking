const SchemaUser = require('../../../public/javascript/modules/mongoDB/models/Users/usrMain');

async function create(object) {
  try {
    const Schema = new SchemaUser();
    Schema.name = object.name;
    Schema.first = object.first;
    Schema.second = object.second;
    Schema.phone = object.phone;
    await Schema.save();
    return true;
  } catch (error) {
    return false;
  }
}

module.exports = create;
