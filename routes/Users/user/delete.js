const SchemaUser = require('../../../public/javascript/modules/mongoDB/models/Users/usrMain');

async function remove(id) {
  try {
    const Schema = new SchemaUser();
    const filter = { _id: id };
    const user = await Schema.findOne(filter);

    if (!user) {
      return 2;
    }

    user.remove();
    return 1;
  } catch (error) {
    return 3;
  }
}

module.exports = remove;
