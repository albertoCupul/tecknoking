const SchemaRules = require('../../../public/javascript/modules/mongoDB/models/Products/rules');
const SchemaLiterals = require('../../../public/javascript/modules/mongoDB/models/Products/literals');

async function add(id, literalsJson) {
  try {
    const Rules = new SchemaRules();
    const Literals = new SchemaLiterals();
    let idsValid = true;

    let filter = { _id: id };
    const rule = await Rules.findOne(filter);
    if (!rule) {
      return false;
    }

    await Promise.all(Object.entries(literalsJson).map(async (literalData) => {
      const indexPosition = literalData[0];
      const idLiteral = literalData[1];
      filter = { _id: idLiteral };
      const found = await Literals.findOne(filter);
      if (found) {
        rule.literals.push({ id: idLiteral, position: indexPosition });
      } else idsValid = false;
    }));

    if (!idsValid) {
      return false;
    }
    rule.save();

    return true;
  } catch (error) {
    return false;
  }
}

module.exports = add;
