const SchemaInventory = require('../../../public/javascript/modules/mongoDB/models/Products/inventory');

const SchemaProduct = require('../../../public/javascript/modules/mongoDB/models/Products/products');

async function create(object) {
  try {
    const SchemaProd = new SchemaProduct();
    const filter = { _id: object.idProduct };
    const existProduct = await SchemaProd.findOne(filter);
    if (!existProduct) return 2;

    const Schema = new SchemaInventory();
    Schema.manage = object.manage;
    if (object.manage) {
      Schema.quantity = object.quantity;
    }
    Schema.isPanel = object.isPanel;
    if (object.isPanel) {
      Schema.width = object.width;
      Schema.height = object.height;
    }
    const idInv = await Schema.save();

    existProduct.inventory = idInv._id;
    existProduct.save();

    return 1;
  } catch (error) {
    return 3;
  }
}

module.exports = create;
