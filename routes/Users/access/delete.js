const SchemaAccess = require('../../../public/javascript/modules/mongoDB/models/Users/access');

async function create(id) {
  try {
    const Schema = new SchemaAccess();
    const filter = { _id: id };
    const existUser = await Schema.findOne(filter);
    if (!existUser) {
      return 2;
    }
    await existUser.remove();
    return 1;
  } catch (error) {
    return 3;
  }
}

module.exports = create;
