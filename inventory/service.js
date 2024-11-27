const { createItemRepo } = require("./repository");
const { v4: uuid } = require("uuid");

const CreateItemService = async (name) => {
  const plu = uuid();
  try {
    const item = await createItemRepo(plu, name);
    return item.rows[0];
  } catch (e) {
    throw e;
  }
};

module.exports = { CreateItemService };
