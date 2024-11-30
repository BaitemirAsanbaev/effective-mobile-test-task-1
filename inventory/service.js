const ApiError = require("../utils/errors");
const InventoryRepo = require("./repository");
const { v4: uuid } = require("uuid");
const { logger } = require("../utils/logger");  // Import the logger

class InventoryService {

  createInventory = async (item_plu, shop_id, amount = 0) => {
    try {
      const id = uuid();
      logger.info(`Creating inventory with ID: ${id}, Item PLU: ${item_plu}, Shop ID: ${shop_id}, Amount: ${amount}`);
      const inventory = await InventoryRepo.createInventory(id, item_plu, shop_id, amount);
      logger.info(`Inventory created successfully: ${JSON.stringify(inventory.rows[0])}`);
      return inventory.rows[0];
    } catch (e) {
      logger.error(`Error creating inventory item: ${e.message}`);
      throw e;
    }
  };


  getInventoryByItemPlu = async (item_plu) => {
    try {
      logger.info(`Fetching inventory for Item PLU: ${item_plu}`);
      const inventory = await InventoryRepo.getInventoryByItemPlu(item_plu);
      logger.info(`Fetched ${inventory.rows.length} inventory items for PLU: ${item_plu}`);
      return inventory.rows;
    } catch (e) {
      logger.error(`Error fetching inventory for Item PLU: ${item_plu} - ${e.message}`);
      throw e;
    }
  };


  getInventoryByShopId = async (shop_id) => {
    try {
      logger.info(`Fetching inventory for Shop ID: ${shop_id}`);
      const inventory = await InventoryRepo.getInventoryByShopId(shop_id);
      logger.info(`Fetched ${inventory.rows.length} inventory items for Shop ID: ${shop_id}`);
      return inventory.rows;
    } catch (e) {
      logger.error(`Error fetching inventory for Shop ID: ${shop_id} - ${e.message}`);
      throw e;
    }
  };


  getInventoryByOrderedAmount = async (from, to) => {
    try {
      logger.info(`Fetching inventory with ordered amounts between: ${from} and ${to}`);
      const inventory = await InventoryRepo.getInventoryByOrderedAmount(from, to);
      logger.info(`Fetched ${inventory.rows.length} inventory items with ordered amounts between ${from} and ${to}`);
      return inventory.rows;
    } catch (e) {
      logger.error(`Error fetching inventory by ordered amount: ${e.message}`);
      throw e;
    }
  };


  getInventoryByAvailableAmount = async (from, to) => {
    try {
      logger.info(`Fetching inventory with available amounts between: ${from} and ${to}`);
      const inventory = await InventoryRepo.getInventoryByAvailableAmount(from, to);
      logger.info(`Fetched ${inventory.rows.length} inventory items with available amounts between ${from} and ${to}`);
      return inventory.rows;
    } catch (e) {
      logger.error(`Error fetching inventory by available amount: ${e.message}`);
      throw e;
    }
  };


  getAllInventorys = async () => {
    try {
      logger.info("Fetching all inventory items");
      const inventorys = await InventoryRepo.getAllInventorys();
      logger.info(`Fetched ${inventorys.rows.length} inventory items`);
      return inventorys.rows;
    } catch (e) {
      logger.error(`Error fetching all inventory items: ${e.message}`);
      throw e;
    }
  };


  increaseAvailable = async (item_plu, shop_id, amount) => {
    try {
      if (amount < 0) {
        throw ApiError.BadRequest('Increase available amount must be a positive value.');
      }
      logger.info(`Increasing available amount for Item PLU: ${item_plu}, Shop ID: ${shop_id} by ${amount}`);
      const inventory = await InventoryRepo.getInventory(item_plu, shop_id);
      const updatedInventory = await InventoryRepo.updateInventory(
        item_plu,
        shop_id,
        null,
        inventory.rows[0].available_amount + amount
      );
      logger.info(`Updated available amount for Item PLU: ${item_plu}, Shop ID: ${shop_id}`);
      return updatedInventory.rows[0];
    } catch (e) {
      logger.error(`Error increasing available amount for Item PLU: ${item_plu}, Shop ID: ${shop_id} - ${e.message}`);
      throw e;
    }
  };


  decreaseAvailable = async (item_plu, shop_id, amount) => {
    try {
      logger.info(`Decreasing available amount for Item PLU: ${item_plu}, Shop ID: ${shop_id} by ${amount}`);
      const inventory = await InventoryRepo.getInventory(item_plu, shop_id);
      if (inventory.rows[0].available_amount - amount < 0) {
        throw ApiError.BadRequest('Cannot decrease available amount below 0.');
      }
      const updatedInventory = await InventoryRepo.updateInventory(
        item_plu,
        shop_id,
        null,
        inventory.rows[0].available_amount - amount
      );
      logger.info(`Updated available amount for Item PLU: ${item_plu}, Shop ID: ${shop_id}`);
      return updatedInventory.rows[0];
    } catch (e) {
      logger.error(`Error decreasing available amount for Item PLU: ${item_plu}, Shop ID: ${shop_id} - ${e.message}`);
      throw e;
    }
  };


  increaseOrdered = async (item_plu, shop_id, amount) => {
    try {
      if (amount < 0) {
        throw ApiError.BadRequest('Increase ordered amount must be a positive value.');
      }
      logger.info(`Increasing ordered amount for Item PLU: ${item_plu}, Shop ID: ${shop_id} by ${amount}`);
      const inventory = await InventoryRepo.getInventory(item_plu, shop_id);
      const updatedInventory = await InventoryRepo.updateInventory(
        item_plu,
        shop_id,
        inventory.rows[0].ordered_amount + amount,
        null
      );
      logger.info(`Updated ordered amount for Item PLU: ${item_plu}, Shop ID: ${shop_id}`);
      return updatedInventory.rows[0];
    } catch (e) {
      logger.error(`Error increasing ordered amount for Item PLU: ${item_plu}, Shop ID: ${shop_id} - ${e.message}`);
      throw e;
    }
  };


  decreaseOrdered = async (item_plu, shop_id, amount) => {
    try {
      logger.info(`Decreasing ordered amount for Item PLU: ${item_plu}, Shop ID: ${shop_id} by ${amount}`);
      const inventory = await InventoryRepo.getInventory(item_plu, shop_id);
      if (inventory.rows[0].ordered_amount - amount < 0) {
        throw ApiError.BadRequest('Cannot decrease ordered amount below 0.');
      }
      const updatedInventory = await InventoryRepo.updateInventory(
        item_plu,
        shop_id,
        inventory.rows[0].ordered_amount - amount,
        null
      );
      logger.info(`Updated ordered amount for Item PLU: ${item_plu}, Shop ID: ${shop_id}`);
      return updatedInventory.rows[0];
    } catch (e) {
      logger.error(`Error decreasing ordered amount for Item PLU: ${item_plu}, Shop ID: ${shop_id} - ${e.message}`);
      throw e;
    }
  };


  orderItem = async (item_plu, shop_id, amount) => {
    try {
      logger.info(`Ordering Item PLU: ${item_plu}, Shop ID: ${shop_id}, Amount: ${amount}`);
      const inventory = await InventoryRepo.getInventory(item_plu, shop_id);
      if (inventory.rows[0].available_amount - amount < 0) {
        throw ApiError.BadRequest('Not enough inventory available to fulfill the order.');
      }
      const updatedInventory = await InventoryRepo.updateInventory(
        item_plu,
        shop_id,
        inventory.rows[0].ordered_amount + amount,
        inventory.rows[0].available_amount - amount
      );
      logger.info(`Updated inventory after ordering Item PLU: ${item_plu}, Shop ID: ${shop_id}`);
      return updatedInventory.rows[0];
    } catch (e) {
      logger.error(`Error ordering Item PLU: ${item_plu}, Shop ID: ${shop_id} - ${e.message}`);
      throw e;
    }
  };


  refundItem = async (item_plu, shop_id, amount) => {
    try {
      logger.info(`Refunding Item PLU: ${item_plu}, Shop ID: ${shop_id}, Amount: ${amount}`);
      const inventory = await InventoryRepo.getInventory(item_plu, shop_id);
      if (inventory.rows[0].ordered_amount - amount < 0) {
        throw ApiError.BadRequest('Cannot refund more items than were ordered.');
      }
      const updatedInventory = await InventoryRepo.updateInventory(
        item_plu,
        shop_id,
        inventory.rows[0].ordered_amount - amount,
        inventory.rows[0].available_amount + amount
      );
      logger.info(`Updated inventory after refunding Item PLU: ${item_plu}, Shop ID: ${shop_id}`);
      return updatedInventory.rows[0];
    } catch (e) {
      logger.error(`Error refunding Item PLU: ${item_plu}, Shop ID: ${shop_id} - ${e.message}`);
      throw e;
    }
  };

  deleteInventory = async (item_plu, shop_id) => {
    try {
      logger.info(`Deleting inventory for Item PLU: ${item_plu}, Shop ID: ${shop_id}`);
      const inventory = await InventoryRepo.deleteInventory(item_plu, shop_id);
      logger.info(`Inventory deleted for Item PLU: ${item_plu}, Shop ID: ${shop_id}`);
      return inventory.rows[0];
    } catch (e) {
      logger.error(`Error deleting inventory for Item PLU: ${item_plu}, Shop ID: ${shop_id} - ${e.message}`);
      throw e;
    }
  };
}

module.exports = new InventoryService();
