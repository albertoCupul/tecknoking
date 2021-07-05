const SchemaOffer = require('../../../public/javascript/modules/mongoDB/models/Products/offer');

const SchemaProduct = require('../../../public/javascript/modules/mongoDB/models/Products/products');

async function create(object) {
  try {
    const SchemaProd = new SchemaProduct();
    const filter = { _id: object.idProduct };
    const existProduct = await SchemaProd.findOne(filter);
    if (!existProduct) return 2;

    object.offer.forEach((element) => {
      const Schema = new SchemaOffer();
      Schema.name = element.name;
      Schema.quantity = element.quantity;
      if (element.gift) {
        Schema.gift = element.gift;
        Schema.giftQuantity = element.giftQuantity;
      }
      Schema.newPrice = element.newPrice;
      Schema.startDate = element.startDate;
      if (element.endDate) {
        Schema.endDate = element.endDate;
      }
      Schema.save();

      existProduct.offer.push(Schema._id);
    });
    existProduct.save();
    return 1;
  } catch (error) {
    return 3;
  }
}

module.exports = create;
