const SchemaProduct = require('../../../public/javascript/modules/mongoDB/models/Products/products');

const category = require('../category/getOne');
const rule = require('../rules/getAllInfo');

const attributeMgr = require('./attributes');

async function edit(object) {
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
    let filter = { name: object.name, _id: { $ne: object.id } };
    const existRecord = await Schema.findOne(filter);
    if (existRecord) {
      return 4;
    }

    filter = { _id: object.id };
    const product = await Schema.findOne(filter);
    if (!product) return 5;

    attributeMgr.delete(product);
    product.name = object.name;
    product.sku = object.sku;
    product.precioVenta = object.precioVenta;
    if (object.idRule) product.idRule = object.idRule;
    product.includeIVA = object.includeIVA;
    product.isComplement = object.isComplement;
    product.idCategory = object.idCategory;
    attributeMgr.add(product, object.attribute);
    await product.save();
    return 1;
  } catch (error) {
    return 6;
  }
}

module.exports = edit;
