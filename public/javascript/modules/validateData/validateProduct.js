function name(nombre) {
  const regex = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]{3,30}$/;
  let valid = false;
  if (nombre) {
    valid = regex.test(nombre);
  }
  return valid;
}

function sku(code) {
  const regex = /^[a-zA-Z0-9]{3,20}$/;
  let valid = false;
  if (code) {
    valid = regex.test(code);
  }
  return valid;
}

function identificador(id) {
  const regex = /^[a-fA-F0-9]{24}$/;
  const resp = regex.test(id);
  return resp;
}

function decimal(valor) {
  const regex = /^\d+(.\d{1,2})?$/;
  let valid = false;
  if (valor) {
    valid = regex.test(valor);
  }
  return valid;
}

function bool(valor) {
  if (valor === true || valor === false) {
    return true;
  }
  return false;
}

function attribute(value) {
  const regex = /^[a-zA-Z0-9%/.°-\s]{2,30}$/;
  let valid = true;
  Promise.all(Object.entries(value).map((record) => {
    if (record[0]) {
      const isValid = regex.test(record[0]);
      if (!isValid) valid = false;
    }
    if (record[1]) {
      const isValid = regex.test(record[1]);
      if (!isValid) valid = false;
    }
    return true;
  }));
  return valid;
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

function isValidProduct(object) {
  const isValidName = name(object.name);
  const isValidSku = sku(object.sku);
  const isValidCosto = decimal(object.precioCosto);
  const isValidVenta = decimal(object.precioVenta);
  const isValidRule = object.idRule ? identificador(object.idRule) : true;
  const isValidIVA = bool(object.includeIVA);
  const isValidComplement = bool(object.isComplement);
  const isValidCategory = identificador(object.idCategory);
  const isValidAttribute = attribute(object.attribute);
  if (isValidName && isValidSku && isValidCosto && isValidVenta && isValidRule
    && isValidIVA && isValidComplement && isValidCategory && isValidAttribute) {
    return true;
  }
  return false;
}

function isValidProductWithId(object) {
  const isValidBody = isValidProduct(object);
  const isValidId = identificador(object.id);
  if (isValidBody && isValidId) {
    return true;
  }
  return false;
}

function isValidInventory(object) {
  const isValidPanel = bool(object.isPanel);
  const isValidManage = bool(object.manage);
  const isValidQuantity = object.quantity ? decimal(object.quantity) : true;
  const isValidWidth = object.width ? decimal(object.width) : true;
  const isValidHeight = object.height ? decimal(object.height) : true;
  const isValidIdProduct = identificador(object.idProduct);
  if (isValidPanel && isValidQuantity && isValidWidth && isValidHeight
    && isValidManage && isValidIdProduct) {
    return true;
  }
  return false;
}

function isValidOffer(object) {
  const isValidName = name(object.name);
  const isValidQuantity = decimal(object.quantity);
  const isValidGift = object.gift ? identificador(object.gift) : true;
  const isValidGiftQuantity = object.giftQuantity ? decimal(object.giftQuantity) : true;
  const isValidNewPrice = decimal(object.newPrice);
  const isValidStartDate = date(object.startDate);
  const isValidEndDate = object.endDate ? date(object.endDate) : true;
  if (isValidName && isValidQuantity && isValidGift && isValidGiftQuantity
    && isValidNewPrice && isValidStartDate && isValidEndDate) {
    return true;
  }
  return false;
}

module.exports.name = name;
module.exports.sku = sku;
module.exports.decimal = decimal;
module.exports.bool = bool;
module.exports.attribute = attribute;
module.exports.date = date;
module.exports.identificador = identificador;
module.exports.isValidProduct = isValidProduct;
module.exports.isValidProductWithId = isValidProductWithId;
module.exports.isValidInventory = isValidInventory;
module.exports.isValidOffer = isValidOffer;
