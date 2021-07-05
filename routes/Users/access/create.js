const SchemaUser = require('../../../public/javascript/modules/mongoDB/models/Users/access');
const bcrypt = require('../../../public/javascript/modules/bycript/functions');

async function create(object) {
  try {
    const Schema = new SchemaUser();
    Schema.user = object.user;
    const pwdEncrypted = await bcrypt.encryptPwd(object.pwd);
    Schema.pwd = pwdEncrypted;
    Schema.idUser = object.idUser;
    await Schema.save();
    return true;
  } catch (error) {
    return false;
  }
}

module.exports = create;
