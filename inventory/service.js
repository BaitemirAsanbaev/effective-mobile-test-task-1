const { createItemRepo } = require("./repository");
const { v4: uuid } = require('uuid');

const CreateItemService = async (name) => {
    const plu = uuid();
    const item = await createItemRepo(plu, name);
    return item.rows[0];
};

module.exports = { CreateItemService };
