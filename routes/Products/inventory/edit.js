const SchemaProduct = require('../../../public/javascript/modules/mongoDB/models/Products/products');

const deleteInv = require('./delete');
const addInventory = require('./create');

async function edit(object) {
  try {
    const SchemaProd = new SchemaProduct();
    const filter = { _id: object.idProduct };
    const existProduct = await SchemaProd.findOne(filter);
    if (!existProduct) return 2;

    if (!existProduct.inventory) return 3;

    const deleted = deleteInv(existProduct.inventory);
    if (!deleted) return 3;

    const created = addInventory(object);
    return created;
  } catch (error) {
    return 3;
  }
}

module.exports = edit;
