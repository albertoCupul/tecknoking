async function delRef(objScheme) {
  try {
    const copyIdLiterals = objScheme.literals.slice();
    copyIdLiterals.forEach((element) => {
      const filter = { _id: element._id };
      objScheme.literals.pull(filter);
    });
    objScheme.save();
    return true;
  } catch (error) {
    return false;
  }
}

module.exports = delRef;
