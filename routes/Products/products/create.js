const SchemaProduct = require('../../../public/javascript/modules/mongoDB/models/Products/products');

const category = require('../category/getOne');
const rule = require('../rules/getAllInfo');

const attributeMgr = require('./attributes');

async function create(object) {
  try {
    const existCategory = await category(object.idCategory);
    let nextHoop = !!existCategory;
    if (!nextHoop) {
      return 2;
    }

    if (object.idRule) {
      const existRule = await rule(object.idRule);
      nextHoop = !!existRule;
      if (!nextHoop) {
        return 3;
      }
    }

    const Schema = new SchemaProduct();
    Schema.name = object.name;
    Schema.sku = object.sku;
    Schema.precioCosto = object.precioCosto;
    Schema.precioVenta = object.precioVenta;
    if (object.idRule) Schema.idRule = object.idRule;
    Schema.includeIVA = object.includeIVA;
    Schema.isComplement = object.isComplement;
    Schema.idCategory = object.idCategory;
    attributeMgr.add(Schema, object.attribute);
    await Schema.save();
    return 1;
  } catch (error) {
    return 4;
  }
}

module.exports = create;
