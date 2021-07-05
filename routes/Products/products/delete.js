const SchemaProduct = require('../../../public/javascript/modules/mongoDB/models/Products/products');

const deleteOffer = require('../offer/delete');
const deleteInventory = require('../inventory/delete');

async function remove(id) {
  try {
    const Schema = new SchemaProduct();
    const filter = { _id: id };
    const existRecord = await Schema.findOne(filter);
    if (!existRecord) {
      return 2;
    }

    await deleteOffer(existRecord, false);

    await deleteInventory(existRecord.inventory);

    await existRecord.remove();

    return 1;
  } catch (error) {
    return 3;
  }
}

module.exports = remove;
