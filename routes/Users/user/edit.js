const SchemaUser = require('../../../public/javascript/modules/mongoDB/models/Users/usrMain');

async function edit(object) {
  try {
    const Schema = new SchemaUser();
    const filter = { _id: object.id };
    const user = await Schema.findOne(filter);

    if (!user) {
      return 2;
    }

    user.name = object.name;
    user.first = object.first;
    user.second = object.second;
    user.phone = object.phone;
    await user.save();
    return 1;
  } catch (error) {
    return 2;
  }
}

module.exports = edit;
