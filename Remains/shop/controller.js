const ApiError = require("../../errors");
const ShopService = require("./service");
const { validationResult } = require("express-validator");

class ShopController {
  async createShop(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Validation error", errors.array()));
      }

      const { name } = req.body;
      const shop = await ShopService.createShop(name);
      return res.status(201).json(shop);
    } catch (e) {
      next(e);
    }
  }

  async getShopById(req, res, next) {
    const id = req.params.id;
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Validation error", errors.array()));
      }

      const shop = await ShopService.getShopById(id);
      if (!shop) {
        return next(ApiError.NotFound(`Shop with PLU ${id} was not found`));
      }
      return res.json(shop);
    } catch (e) {
      next(e);
    }
  }

  async getShopByName(req, res, next) {
    const name = req.params.name;
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Validation error", errors.array()));
      }

      const shop = await ShopService.getShopByName(name);
      if (!shop) {
        return next(ApiError.NotFound(`Shop with name ${name} was not found`));
      }
      return res.json(shop);
    } catch (e) {
      next(e);
    }
  }

  async getAllShops(req, res, next) {
    try {
      const shops = await ShopService.getAllShops();
      return res.json(shops);
    } catch (e) {
      next(e);
    }
  }

  async updateShop(req, res, next) {
    const id = req.params.id;
    const { name } = req.body;
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Validation error", errors.array()));
      }

      const updatedShop = await ShopService.updateShop(id, name);
      if (!updatedShop) {
        return next(ApiError.NotFound(`Shop with PLU ${id} was not found`));
      }
      return res.json(updatedShop);
    } catch (e) {
      next(e);
    }
  }

  async deleteShop(req, res, next) {
    const id = req.params.id;
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Validation error", errors.array()));
      }

      const deletedShop = await ShopService.deleteShop(id);
      if (!deletedShop) {
        return next(ApiError.NotFound(`Shop with PLU ${id} was not found`));
      }
      return res.json(deletedShop);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new ShopController();
