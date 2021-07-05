const bcrypt = require('../../../public/javascript/modules/bycript/functions');
const SchemaAccess = require('../../../public/javascript/modules/mongoDB/models/Users/access');

async function create(object) {
  try {
    const Schema = new SchemaAccess();
    const filter = { _id: object.id };
    const existUser = await Schema.findOne(filter);
    if (!existUser) {
      return 2;
    }

    const newPwd = await bcrypt.encryptPwd(object.pwd);
    existUser.pwd = newPwd;
    await existUser.save();
    return 1;
  } catch (error) {
    return 3;
  }
}

module.exports = create;
