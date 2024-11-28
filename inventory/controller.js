const ApiError = require("./errors");
const InventoryService = require("./service");
const { validationResult } = require("express-validator");

class InventoryController {
  async createItem(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Validation error", errors.array()));
      }

      const { name } = req.body;
      const item = await InventoryService.createItem(name);
      return res.status(201).json(item);
    } catch (e) {
      next(e);
    }
  }

  async getItemByPlu(req, res, next) {
    const plu = req.params.plu;
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Validation error", errors.array()));
      }

      const item = await InventoryService.getItemByPlu(plu);
      if (!item) {
        return next(ApiError.NotFound(`Item with PLU ${plu} was not found`));
      }
      return res.json(item);
    } catch (e) {
      next(e);
    }
  }

  async getItemByName(req, res, next) {
    const name = req.params.name;
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Validation error", errors.array()));
      }

      const item = await InventoryService.getItemByName(name);
      if (!item) {
        return next(ApiError.NotFound(`Item with name ${name} was not found`));
      }
      return res.json(item);
    } catch (e) {
      next(e);
    }
  }

  async getAllItems(req, res, next) {
    try {
      const items = await InventoryService.getAllItems();
      return res.json(items);
    } catch (e) {
      next(e);
    }
  }

  async updateItem(req, res, next) {
    const plu = req.params.plu;
    const { name } = req.body;
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Validation error", errors.array()));
      }

      const updatedItem = await InventoryService.updateItem(plu, name);
      if (!updatedItem) {
        return next(ApiError.NotFound(`Item with PLU ${plu} was not found`));
      }
      return res.json(updatedItem);
    } catch (e) {
      next(e);
    }
  }

  async deleteItem(req, res, next) {
    const plu = req.params.plu;
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Validation error", errors.array()));
      }

      const deletedItem = await InventoryService.deleteItem(plu);
      if (!deletedItem) {
        return next(ApiError.NotFound(`Item with PLU ${plu} was not found`));
      }
      return res.json(deletedItem);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new InventoryController();
