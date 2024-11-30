const ItemRepo = require("./repository");
const { v4: uuid } = require("uuid");

class ItemService {
  createItem = async (name) => {
    const plu = uuid();
    try {
      const item = await ItemRepo.createItem(plu, name);
      return item.rows[0];
    } catch (e) {
      throw e;
    }
  };

  getItemByPlu = async (plu) => {
    try {
      const item = await ItemRepo.getItemByPlu(plu);
      return item.rows[0];
    } catch (e) {
      throw e;
    }
  };

  getItemByName = async (name) => {
    try {
      const item = await ItemRepo.getItemByName(name);
      return item.rows[0];
    } catch (e) {
      throw e;
    }
  };

  getAllItems = async () => {
    try {
      const items = await ItemRepo.getAllItems();
      return items.rows;
    } catch (e) {
      throw e;
    }
  };

  updateItem = async (plu, name) => {
    try {
      const item = await ItemRepo.updateItem(plu, name);
      return item.rows[0];
    } catch (e) {
      throw e;
    }
  };

  deleteItem = async (plu) => {
    try {
      const item = await ItemRepo.deleteItem(plu);
      return item.rows[0];
    } catch (e) {
      throw e;
    }
  };
}

module.exports = new ItemService();
