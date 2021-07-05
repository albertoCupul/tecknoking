function name(nombre) {
  const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,30}$/;
  let valid = false;
  if (nombre) {
    valid = regex.test(nombre);
  }
  return valid;
}

function user(nombre) {
  const regex = /^[a-zA-Z0-9]{3,15}$/;
  let valid = false;
  if (nombre) {
    valid = regex.test(nombre);
  }
  return valid;
}

function pwd(nombre) {
  const regex = /^[a-zA-Z0-9&$/%!¡_]{3,30}$/;
  let valid = false;
  if (nombre) {
    valid = regex.test(nombre);
  }
  return valid;
}

function identificador(id) {
  const regex = /^[a-fA-F0-9]{24}$/;
  const resp = regex.test(id);
  return resp;
}

function date(value) {
  try {
    const myDate = new Date(value).valueOf().toString();
    if (myDate === 'NaN') {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
}

function phone(telNumber) {
  const regex = /^\d{10}?$/;
  const resp = regex.test(telNumber);
  return resp;
}

function validateUser(object) {
  const isValidName = name(object.name);
  const isValidFirst = name(object.first);
  const isValidSecond = (object.second) ? name(object.second) : true;
  const isValidPhone = (object.phone) ? phone(object.phone) : true;
  if (isValidName && isValidFirst && isValidSecond && isValidPhone) {
    return true;
  }
  return false;
}

function validateAccessUser(object) {
  const isValidUser = user(object.user);
  const isValidPwd = pwd(object.pwd);
  const isValidId = identificador(object.idUser);
  if (isValidUser && isValidPwd && isValidId) {
    return true;
  }
  return false;
}

function validateResetPwd(object) {
  const isValidPwd = pwd(object.pwd);
  const isValidId = identificador(object.id);
  if (isValidPwd && isValidId) {
    return true;
  }
  return false;
}

function login(object) {
  const isValidId = user(object.user);
  const isValidPwd = pwd(object.pwd);
  if (isValidId && isValidPwd) {
    return true;
  }
  return false;
}

module.exports.name = name;
module.exports.date = date;
module.exports.identificador = identificador;
module.exports.phone = phone;
module.exports.user = user;
module.exports.validateUser = validateUser;
module.exports.validateAccessUser = validateAccessUser;
module.exports.validateResetPwd = validateResetPwd;
module.exports.login = login;
