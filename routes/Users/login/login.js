const SchemaUser = require('../../../public/javascript/modules/mongoDB/models/Users/access');
const bcrypt = require('../../../public/javascript/modules/bycript/functions');
const webToken = require('../../../public/javascript/modules/webtoken/token');

async function create(object) {
  try {
    const Schema = new SchemaUser();
    const filter = { user: object.user };
    const usrLogin = await Schema.findOne(filter);
    const samePwd = await bcrypt.comparePwd(object.pwd, usrLogin.pwd);
    if (!samePwd) {
      return 2;
    }
    const newToken = webToken.generate(object);
    return newToken;
  } catch (error) {
    return 3;
  }
}

module.exports = create;
