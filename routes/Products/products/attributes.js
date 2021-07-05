async function addAttributes(Schema, object) {
  Promise.all(Object.entries(object).map((record) => {
    Schema.attributes.push({ name: record[0], value: record[1] });
    return true;
  }));
  return true;
}

async function deleteAttributes(Schema) {
  const ids = Schema.attributes.slice();
  Promise.all(Object.entries(ids).map((record) => {
    Schema.attributes.pull({ _id: record[1]._id });
    return true;
  }));
  return true;
}

module.exports.add = addAttributes;
module.exports.delete = deleteAttributes;
