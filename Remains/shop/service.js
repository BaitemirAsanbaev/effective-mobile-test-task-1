const ShopRepo = require("./repository");

class ShopService {
  createShop = async (name) => {
    try {
      const shop = await ShopRepo.createShop(name);
      return shop.rows[0];
    } catch (e) {
      throw e;
    }
  };
  getShopById = async (id) => {
    try {
      const shop = await ShopRepo.getShopById(id);
      return shop.rows[0];
    } catch (e) {
      throw e;
    }
  };
  getAllShops = async () => {
    try {
      const shops = await ShopRepo.getAllShops();
      return shops.rows;
    } catch (e) {
      throw e;
    }
  };
  updateShop = async (id, name) => {
    try {
      const shop = await ShopRepo.updateShop(id, name);
      return shop.rows[0];
    } catch (e) {
      throw e;
    }
  };
  deleteShop = async (id) => {
    try {
      const shop = await ShopRepo.deleteShop(id);
      return shop.rows[0];
    } catch (e) {
      throw e;
    }
  };
}

module.exports = new ShopService;
