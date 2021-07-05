const SchemaProduct = require('../../../public/javascript/modules/mongoDB/models/Products/products');

const deleteOffer = require('./delete');
const addOffer = require('./create');

async function edit(object) {
  try {
    const SchemaProd = new SchemaProduct();
    const filter = { _id: object.idProduct };
    const existProduct = await SchemaProd.findOne(filter);
    if (!existProduct) return 2;

    const deleted = deleteOffer(existProduct);
    if (!deleted) return 3;

    const created = addOffer(object);
    return created;
  } catch (error) {
    return 3;
  }
}

module.exports = edit;
