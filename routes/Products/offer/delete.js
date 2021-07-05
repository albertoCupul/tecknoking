const SchemaOffer = require('../../../public/javascript/modules/mongoDB/models/Products/offer');

async function removeOfferProduct(product) {
  const arrayTmp = product.offer.slice();
  arrayTmp.forEach((id) => {
    const filter = { _id: id };
    product.offer.pull(filter);
  });
  product.save();
}

async function remove(product, pullOffer = true) {
  try {
    const Schema = new SchemaOffer();
    product.offer.forEach((id) => {
      const filter = { _id: id };
      Schema.findOneAndRemove(filter);
    });

    if (pullOffer) {
      removeOfferProduct(product);
    }

    return true;
  } catch (error) {
    return false;
  }
}
module.exports = remove;
