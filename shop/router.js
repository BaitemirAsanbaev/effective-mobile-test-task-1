const { Router } = require("express");
const ShopController = require("./controller");
const validate = require("../middleware");
const { body, param } = require("express-validator");

const ShopRouter = new Router();

const validateParamId = [
  param("plu")
    .notEmpty()
    .withMessage("PLU is required")
    .isUUID()
    .withMessage("PLU must be a valid UUID"),
]
const validateBodyName = [
  body("name")
      .notEmpty()
      .withMessage("Name is required"),
]

ShopRouter.post("/create", validate(validateBodyName), ShopController.createShop);
ShopRouter.get("/all", ShopController.getAllShops);
ShopRouter.get("/:id", validate(validateParamId), ShopController.getShopById);
ShopRouter.put("/update/:id", validate([...validateParamId, ...validateBodyName]), ShopController.updateShop);
ShopRouter.delete("/delete/:id", validate(validateParamId), ShopController.deleteShop);

module.exports = ShopRouter;
