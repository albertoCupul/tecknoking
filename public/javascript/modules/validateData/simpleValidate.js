function name(nombre) {
  const regex = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ_\s]{3,30}$/;
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

module.exports.name = name;
module.exports.identificador = identificador;
