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
  getItemByPlu = async (plu) => {
    try {
      const item = await InventoryRepo.getItemByPlu(plu);
      return item.rows[0];
    } catch (e) {
      throw e;
    }
  };
  getItemByName = async (name) => {
    try {
      const item = await InventoryRepo.getItemByName(name);
      return item.rows[0];
    } catch (e) {
      throw e;
    }
  };
  getAllItems = async () => {
    try {
      const items = await InventoryRepo.getAllItems();
      return items.rows;
    } catch (e) {
      throw e;
    }
  };
  updateItem = async (plu, name) => {
    try {
      const item = await InventoryRepo.updateItem(plu, name);
      return item.rows[0];
    } catch (e) {
      throw e;
    }
  };
  deleteItem = async (plu) => {
    try {
      const item = await InventoryRepo.deleteItem(plu);
      return item.rows[0];
    } catch (e) {
      throw e;
    }
  };
}

module.exports = new InventoryService;
