function name(nombre) {
  const regex = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ]{2,30}$/;
  let valid = false;
  if (nombre) {
    valid = regex.test(nombre);
  }
  return valid;
}

function valueSys(valor) {
  const regex = /^[a-zA-Z0-9]{3,30}$/;
  let valid = false;
  if (valor) {
    valid = regex.test(valor);
  }
  return valid;
}

function value(valor) {
  const regex = /^\d+(.\d{1,2})?$/;
  let valid = false;
  if (valor) {
    valid = regex.test(valor);
  }
  return valid;
}

function identificador(id) {
  const regex = /^[a-fA-F0-9]{24}$/;
  const resp = regex.test(id);
  return resp;
}

module.exports.name = name;
module.exports.identificador = identificador;
module.exports.valueSys = valueSys;
module.exports.value = value;
