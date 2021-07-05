const jwt = require('jsonwebtoken');

const secret = 'd76657247ab20624c5133d41bd54588f';
const lifeTime = '1d';

function generate(obj) {
  const JwtObj = {
    user: obj.name,
    pwd: obj.pwd,
  };

  const token = jwt.sign(JwtObj, secret, { expiresIn: lifeTime });
  return token;
}

module.exports.generate = generate;
