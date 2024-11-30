const { logger } = require("../utils/logger"); // Import the logger
const ShopRepo = require("./repository");

class ShopService {

  createShop = async (name) => {
    try {
      logger.info(`Creating a new shop with name: ${name}`);
      const shop = await ShopRepo.createShop(name);
      logger.info(`Shop created successfully with ID: ${shop.rows[0].id}`);
      return shop.rows[0];
    } catch (e) {
      logger.error(`Error creating shop with name: ${name} - ${e.message}`);
      throw e;
    }
  };


  getShopById = async (id) => {
    try {
      logger.info(`Fetching shop with ID: ${id}`);
      const shop = await ShopRepo.getShopById(id);
      if (shop.rows.length === 0) {
        logger.warn(`No shop found with ID: ${id}`);
      } else {
        logger.info(`Fetched shop with ID: ${id}`);
      }
      return shop.rows;
    } catch (e) {
      logger.error(`Error fetching shop with ID: ${id} - ${e.message}`);
      throw e;
    }
  };


  getAllShops = async () => {
    try {
      logger.info("Fetching all shops");
      const shops = await ShopRepo.getAllShops();
      logger.info(`Fetched ${shops.rows.length} shops`);
      return shops.rows;
    } catch (e) {
      logger.error(`Error fetching all shops: ${e.message}`);
      throw e;
    }
  };


  updateShop = async (id, name) => {
    try {
      logger.info(`Updating shop with ID: ${id} to new name: ${name}`);
      const shop = await ShopRepo.updateShop(id, name);
      logger.info(`Shop updated successfully with ID: ${id}`);
      return shop.rows[0];
    } catch (e) {
      logger.error(`Error updating shop with ID: ${id} - ${e.message}`);
      throw e;
    }
  };


  deleteShop = async (id) => {
    try {
      logger.info(`Deleting shop with ID: ${id}`);
      const shop = await ShopRepo.deleteShop(id);
      logger.info(`Shop deleted successfully with ID: ${id}`);
      return shop.rows[0];
    } catch (e) {
      logger.error(`Error deleting shop with ID: ${id} - ${e.message}`);
      throw e;
    }
  };
}

module.exports = new ShopService();
