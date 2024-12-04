const { default: axios } = require("axios");
const ApiError = require("../utils/errors");
const logger = require("../utils/logger");
const InventoryRepo = require("./repository");
const { v4: uuid } = require("uuid");
const dotenv = require("dotenv")
dotenv.config();

class InventoryService {

  createInventory = async (item_plu, shop_id, amount = 0) => {
    try {
      const id = uuid();
      logger.info(`Creating inventory with ID: ${id}, Item PLU: ${item_plu}, Shop ID: ${shop_id}, Amount: ${amount}`);
      const inventory = await InventoryRepo.createInventory(id, item_plu, shop_id, amount);
      const newInventory = inventory.rows[0]
      logger.info(`Inventory created successfully: ${JSON.stringify(newInventory)}`);
      const res = await axios.post(process.env.SIDE_SERVICE_URL+'/api/v1/history/create', {inventory_id:newInventory.id, amount, action:"CREATE"})
      logger.info(`Creation action added to history: ${res.data}`);
      return inventory.rows[0];
    } catch (e) {
      logger.error(`Error creating inventory item: ${e}`);
      throw e;
    }
  };



  getInventory = async (request) => {
    logger.error("service TOP")
    
    try {
      logger.info(`Fetching inventory for request: ${request}`);
      const inventory = await InventoryRepo.getInventory(request);
      logger.info(`Fetched ${inventory.rows.length} inventory items for request: ${request}`);
      return inventory.rows;
    } catch (e) {
      logger.error("ERROR in service", e)
      
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
      logger.error(`Error fetching all inventory items: ${e}`);
      throw e;
    }
  };


  increaseAvailable = async (item_plu, shop_id, amount) => {
    try {
      if (amount < 0) {
        throw ApiError.BadRequest('Increase available amount must be a positive value.');
      }
      logger.info(`Increasing available amount for Item PLU: ${item_plu}, Shop ID: ${shop_id} by ${amount}`);
      const inventory = await InventoryRepo.getInventory({item_plu, shop_id});
      const updatedInventory = await InventoryRepo.updateInventory(
        item_plu,
        shop_id,
        null,
        inventory.rows[0].available_amount + amount
      );
      logger.info(`Updated available amount for Item PLU: ${item_plu}, Shop ID: ${shop_id}`);
      const res = await axios.post(process.env.SIDE_SERVICE_URL+'/api/v1/history/create', {inventory_id:inventory.rows[0].id, amount, action:"INCREASE_AVAILABLE"})
      logger.info(res.data)
      return updatedInventory.rows[0];
    } catch (e) {
      logger.error(`Error increasing available amount for Item PLU: ${item_plu}, Shop ID: ${shop_id} - ${e}`);
      throw e;
    }
  };


  decreaseAvailable = async (item_plu, shop_id, amount) => {
    try {
      logger.info(`Decreasing available amount for Item PLU: ${item_plu}, Shop ID: ${shop_id} by ${amount}`);
      const inventory = await InventoryRepo.getInventory({item_plu, shop_id});
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
      const res = await axios.post(process.env.SIDE_SERVICE_URL+'/api/v1/history/create', {inventory_id:inventory.rows[0].id, amount, action:"DECREASE_AVAILABLE"})
      logger.info(res.data)
      return updatedInventory.rows[0];
    } catch (e) {
      logger.error(`Error decreasing available amount for Item PLU: ${item_plu}, Shop ID: ${shop_id} - ${e}`);
      throw e;
    }
  };


  increaseOrdered = async (item_plu, shop_id, amount) => {
    try {
      if (amount < 0) {
        throw ApiError.BadRequest('Increase ordered amount must be a positive value.');
      }
      logger.info(`Increasing ordered amount for Item PLU: ${item_plu}, Shop ID: ${shop_id} by ${amount}`);
      const inventory = await InventoryRepo.getInventory({item_plu, shop_id});
      const updatedInventory = await InventoryRepo.updateInventory(
        item_plu,
        shop_id,
        inventory.rows[0].ordered_amount + amount,
        null
      );
      logger.info(`Updated ordered amount for Item PLU: ${item_plu}, Shop ID: ${shop_id}`);
      const res = await axios.post(process.env.SIDE_SERVICE_URL+'/api/v1/history/create', {inventory_id:inventory.rows[0].id, amount, action:"INCREASE_ORDERED"})
      logger.info(res.data)
      return updatedInventory.rows[0];
    } catch (e) {
      logger.error(`Error increasing ordered amount for Item PLU: ${item_plu}, Shop ID: ${shop_id} - ${e}`);
      throw e;
    }
  };


  decreaseOrdered = async (item_plu, shop_id, amount) => {
    try {
      logger.info(`Decreasing ordered amount for Item PLU: ${item_plu}, Shop ID: ${shop_id} by ${amount}`);
      const inventory = await InventoryRepo.getInventory({item_plu, shop_id});
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
      const res = await axios.post(process.env.SIDE_SERVICE_URL+'/api/v1/history/create', {inventory_id:inventory.rows[0].id, amount, action:"DECREASE_ORDERED"})
      logger.info(res.data)
      return updatedInventory.rows[0];
    } catch (e) {
      logger.error(`Error decreasing ordered amount for Item PLU: ${item_plu}, Shop ID: ${shop_id} - ${e}`);
      throw e;
    }
  };


  orderItem = async (item_plu, shop_id, amount) => {
    try {
      logger.info(`Ordering Item PLU: ${item_plu}, Shop ID: ${shop_id}, Amount: ${amount}`);
      const inventory = await InventoryRepo.getInventory({item_plu, shop_id});
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
      const res = await axios.post(process.env.SIDE_SERVICE_URL+'/api/v1/history/create', {inventory_id:inventory.rows[0].id, amount, action:"ORDER"})
      logger.info(res.data)
      return updatedInventory.rows[0];
    } catch (e) {
      logger.error(`Error ordering Item PLU: ${item_plu}, Shop ID: ${shop_id} - ${e}`);
      throw e;
    }
  };


  refundItem = async (item_plu, shop_id, amount) => {
    try {
      logger.info(`Refunding Item PLU: ${item_plu}, Shop ID: ${shop_id}, Amount: ${amount}`);
      const inventory = await InventoryRepo.getInventory({item_plu, shop_id});
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
      const res = await axios.post(process.env.SIDE_SERVICE_URL+'/api/v1/history/create', {inventory_id:inventory.rows[0].id, amount, action:"REFUND"})
      logger.info(res.data)
      return updatedInventory.rows[0];
    } catch (e) {
      logger.error(`Error refunding Item PLU: ${item_plu}, Shop ID: ${shop_id} - ${e}`);
      throw e;
    }
  };

  deleteInventory = async (item_plu, shop_id) => {
    try {
      logger.info(`Deleting inventory for Item PLU: ${item_plu}, Shop ID: ${shop_id}`);
      const inventory = await InventoryRepo.deleteInventory(item_plu, shop_id);
      logger.info(`Inventory deleted for Item PLU: ${item_plu}, Shop ID: ${shop_id}`);
      const res = await axios.post(process.env.SIDE_SERVICE_URL+'/api/v1/history/create', {inventory_id:inventory.rows[0].id, amount, action:"DELETE"})
      logger.info(res.data)
      return inventory.rows[0];
    } catch (e) {
      logger.error(`Error deleting inventory for Item PLU: ${item_plu}, Shop ID: ${shop_id} - ${e}`);
      throw e;
    }
  };
}

module.exports = new InventoryService();
