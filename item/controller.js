const ApiError = require("../errors");
const ItemService = require("./service");
const { validationResult } = require("express-validator");

class ItemController {
  async createItem(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Validation error", errors.array()));
      }

      const { name } = req.body;
      const item = await ItemService.createItem(name);
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

      const item = await ItemService.getItemByPlu(plu);
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

      const item = await ItemService.getItemByName(name);
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
      const items = await ItemService.getAllItems();
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

      const updatedItem = await ItemService.updateItem(plu, name);
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

      const deletedItem = await ItemService.deleteItem(plu);
      if (!deletedItem) {
        return next(ApiError.NotFound(`Item with PLU ${plu} was not found`));
      }
      return res.json(deletedItem);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new ItemController();
