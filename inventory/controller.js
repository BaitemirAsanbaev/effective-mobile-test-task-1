const ApiError = require("../errors");
const InventoryService = require("./service");
const { validationResult } = require("express-validator");

class InventoryController {
  async createInventory(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Validation error", errors.array()));
      }

      const { item_plu, shop_id, amount} = req.body;
      const inventory = await InventoryService.createInventory(item_plu, shop_id, amount);
      return res.status(201).json(inventory);
    } catch (e) {
      next(e);
    }
  }

  async getInventoryByItemPlu(req, res, next) {
    const item_plu = req.params.item_plu;
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Validation error", errors.array()));
      }

      const inventory = await InventoryService.getInventoryByItemPlu(item_plu);
      if (!inventory) {
        return next(ApiError.NotFound(`Inventory with PLU ${item_plu} was not found`));
      }
      return res.json(inventory);
    } catch (e) {
      next(e);
    }
  }

  async getInventoryByShopId(req, res, next) {
    const shop_id = req.params.shop_id;
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Validation error", errors.array()));
      }

      const inventory = await InventoryService.getInventoryByShopId(shop_id);
      if (!inventory) {
        return next(ApiError.NotFound(`Inventory with shop_id ${shop_id} was not found`));
      }
      return res.json(inventory);
    } catch (e) {
      next(e);
    }
  }
  async getInventoryByOrderedAmount(req, res, next) {
    const {from, to} = req.body;
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Validation error", errors.array()));
      }

      const inventory = await InventoryService.getInventoryByOrderedAmount(from, to);
      if (!inventory) {
        return next(ApiError.NotFound(`Inventories with amount of ordered items in range from ${from} to ${to} were not found`))
      }
      return res.json(inventory);
    } catch (e) {
      next(e);
    }
  }
  async getInventoryByAvailableAmount(req, res, next) {
    const {from, to} = req.body;
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Validation error", errors.array()));
      }

      const inventory = await InventoryService.getInventoryByAvailableAmount(from, to);
      if (!inventory) {
        return next(ApiError.NotFound(`Inventories with amount of available items in range from ${from} to ${to} were not found`));
      }
      return res.json(inventory);
    } catch (e) {
      next(e);
    }
  }

  async getAllInventorys(req, res, next) {
    try {
      const inventorys = await InventoryService.getAllInventorys();
      return res.json(inventorys);
    } catch (e) {
      next(e);
    }
  }

  async increaseAvailable(req, res, next) {
    const { item_plu, shop_id, amount } = req.body;
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Validation error", errors.array()));
      }

      const updatedInventory = await InventoryService.increaseAvailable(item_plu, shop_id, amount);
      if (!updatedInventory) {
        return next(ApiError.NotFound(`Inventory with PLU ${item_plu} in shop with ${shop_id} was not found`));
      }
      return res.json(updatedInventory);
    } catch (e) {
      next(e);
    }
  }
  async decreaseAvailable(req, res, next) {
    const { item_plu, shop_id, amount } = req.body;
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Validation error", errors.array()));
      }

      const updatedInventory = await InventoryService.decreaseAvailable(item_plu, shop_id, amount);
      if (!updatedInventory) {
        return next(ApiError.NotFound(`Inventory with PLU ${item_plu} in shop with ${shop_id} was not found`));
      }
      return res.json(updatedInventory);
    } catch (e) {
      next(e);
    }
  }
  

  async increaseOrdered(req, res, next) {
    const { item_plu, shop_id, amount } = req.body;
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Validation error", errors.array()));
      }

      const updatedInventory = await InventoryService.increaseOrdered(item_plu, shop_id, amount);
      if (!updatedInventory) {
        return next(ApiError.NotFound(`Inventory with PLU ${item_plu} in shop with ${shop_id} was not found`));
      }
      return res.json(updatedInventory);
    } catch (e) {
      next(e);
    }
  }
  async decreaseOrdered(req, res, next) {
    const { item_plu, shop_id, amount } = req.body;
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Validation error", errors.array()));
      }

      const updatedInventory = await InventoryService.decreaseOrdered(item_plu, shop_id, amount);
      if (!updatedInventory) {
        return next(ApiError.NotFound(`Inventory with PLU ${item_plu} in shop with ${shop_id} was not found`));
      }
      return res.json(updatedInventory);
    } catch (e) {
      next(e);
    }
  }
  async orderItem(req, res, next) {
    const { item_plu, shop_id, amount } = req.body;
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Validation error", errors.array()));
      }

      const updatedInventory = await InventoryService.orderItem(item_plu, shop_id, amount);
      if (!updatedInventory) {
        return next(ApiError.NotFound(`Inventory with PLU ${item_plu} in shop with ${shop_id} was not found`));
      }
      return res.json(updatedInventory);
    } catch (e) {
      next(e);
    }
  }
  async refundItem(req, res, next) {
    const { item_plu, shop_id, amount } = req.body;

    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Validation error", errors.array()));
      }

      const updatedInventory = await InventoryService.refundItem(item_plu, shop_id, amount);
      if (!updatedInventory) {
        return next(ApiError.NotFound(`Inventory with PLU ${item_plu} in shop with ${shop_id} was not found`));
      }
      return res.json(updatedInventory);
    } catch (e) {
      next(e);
    }
  }

  async deleteInventory(req, res, next) {
    const {item_plu, shop_id} = req.body;
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Validation error", errors.array()));
      }

      const deletedInventory = await InventoryService.deleteInventory(item_plu, shop_id);
      if (!deletedInventory) {
        return next(ApiError.NotFound(`Inventory with PLU ${item_plu} in shop ${shop_id} was not found`));
      }
      return res.json(deletedInventory);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new InventoryController();
