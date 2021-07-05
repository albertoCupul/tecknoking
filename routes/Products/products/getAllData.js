const SchemaProduct = require('../../../public/javascript/modules/mongoDB/models/Products/products');

async function getAllData(id) {
  try {
    const Schema = new SchemaProduct();
    const filter = { _id: id };
    const product = await Schema.findOnePopulate(filter);
    return product;
  } catch (error) {
    return null;
  }
}

module.exports = getAllData;
