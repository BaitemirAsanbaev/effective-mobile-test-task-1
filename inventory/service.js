const InventoryRepo = require("./repository");
const { v4: uuid } = require("uuid");

class InventoryService {
  createItem = async (name) => {
    const plu = uuid();
    try {
      const item = await InventoryRepo.createItem(plu, name);
      return item.rows[0];
    } catch (e) {
      throw e;
    }
  };
}

module.exports = new InventoryService;
