const InventoryRepo = require("./repository");
const { v4: uuid } = require("uuid");

class InventoryService {
  createInventory = async (item_plu, shop_id, amount = 0) => {
    try {
      const inventory = await InventoryRepo.createInventory(
        item_plu,
        shop_id,
        amount
      );
      return inventory.rows[0];
    } catch (e) {
      throw e;
    }
  };
  getInventoryByItemPlu = async (item_plu) => {
    try {
      const inventory = await InventoryRepo.getInventoryByItemPlu(item_plu);
      return inventory.rows;
    } catch (e) {
      throw e;
    }
  };
  getInventoryByShopId = async (shop_id) => {
    try {
      const inventory = await InventoryRepo.getInventoryByShopId(shop_id);
      return inventory.rows;
    } catch (e) {
      throw e;
    }
  };
  getInventoryByOrderedAmount = async (from, to) => {
    try {
      const inventory = await InventoryRepo.getInventoryByOrderedAmount(
        from,
        to
      );
      return inventory.rows;
    } catch (e) {
      throw e;
    }
  };
  getInventoryByAvailableAmount = async (from, to) => {
    try {
      const inventory = await InventoryRepo.getInventoryByAvailableAmount(
        from,
        to
      );
      return inventory.rows;
    } catch (e) {
      throw e;
    }
  };
  getAllInventorys = async () => {
    try {
      const inventorys = await InventoryRepo.getAllInventorys();
      return inventorys.rows;
    } catch (e) {
      throw e;
    }
  };
  increaseAvailable = async (item_plu, shop_id, amount) => {
    try {
      console.log(item_plu, shop_id, amount);

      const inventory = await InventoryRepo.getInventory(item_plu, shop_id);
      const updatedInventory = await InventoryRepo.updateInventory(
        item_plu,
        shop_id,
        null,
        inventory.rows[0].available_amount + amount
      );
      console.log(updatedInventory);

      return updatedInventory.rows[0];
    } catch (e) {
      throw e;
    }
  };
  decreaseAvailable = async (item_plu, shop_id, amount) => {
    try {
      const inventory = await InventoryRepo.getInventory(item_plu, shop_id);
      const updatedInventory = await InventoryRepo.updateInventory(
        item_plu,
        shop_id,
        null,
        inventory.rows[0].available_amount - amount
      );
      return updatedInventory.rows[0];
    } catch (e) {
      throw e;
    }
  };
  increaseOrdered = async (item_plu, shop_id, amount) => {
    try {
      const inventory = await InventoryRepo.getInventory(item_plu, shop_id);
      const updatedInventory = await InventoryRepo.updateInventory(
        item_plu,
        shop_id,
        inventory.rows[0].ordered_amount + amount,
        null
      );
      return updatedInventory.rows[0];
    } catch (e) {
      throw e;
    }
  };
  decreaseOrdered = async (item_plu, shop_id, amount) => {
    try {
      const inventory = await InventoryRepo.getInventory(item_plu, shop_id);
      const updatedInventory = await InventoryRepo.updateInventory(
        item_plu,
        shop_id,
        inventory.rows[0].ordered_amount - amount,
        null
      );
      return updatedInventory.rows[0];
    } catch (e) {
      throw e;
    }
  };
  orderItem = async (item_plu, shop_id, amount) => {
    try {
      const inventory = await InventoryRepo.getInventory(item_plu, shop_id);
      
      const updatedInventory = await InventoryRepo.updateInventory(
        item_plu,
        shop_id,
        inventory.rows[0].ordered_amount + amount,
        inventory.rows[0].available_amount - amount
      );
      return updatedInventory.rows[0];
    } catch (e) {
      throw e;
    }
  };
  refundItem = async (item_plu, shop_id, amount) => {
    try {
      const inventory = await InventoryRepo.getInventory(item_plu, shop_id);
      const updatedInventory = await InventoryRepo.updateInventory(
        item_plu,
        shop_id,
        inventory.rows[0].ordered_amount - amount,
        inventory.rows[0].available_amount + amount
      );
      return updatedInventory.rows[0];
    } catch (e) {
      throw e;
    }
  };
  deleteInventory = async (item_plu, shop_id) => {
    try {
      const inventory = await InventoryRepo.deleteInventory(item_plu, shop_id);
      return inventory.rows[0];
    } catch (e) {
      throw e;
    }
  };
}

module.exports = new InventoryService();
