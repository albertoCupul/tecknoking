async function isEditable(id, Schema) {
  const filter = { _id: id };
  const isEditLiteral = await Schema.findOne(filter);
  if (isEditLiteral.editable === false) return false;
  return true;
}

module.exports = isEditable;
