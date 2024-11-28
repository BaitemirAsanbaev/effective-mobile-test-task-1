const { Router } = require("express");
const ShopController = require("./controller");
const validate = require("../../middleware");
const { body, param } = require("express-validator");

const ShopRouter = new Router();


const validateCreateShop = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string"),
];

const validateGetShopById = [
  param("id")
    .notEmpty()
    .withMessage("ID is required")
];
  
const validateUpdateShop = [
  param("id")
    .notEmpty()
    .withMessage("ID is required")
    .isUUID()
    .withMessage("ID must be a valid UUID"),
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string"),
];

const validateDeleteShop = [
  param("id")
    .notEmpty()
    .withMessage("ID is required")
    .isUUID()
    .withMessage("ID must be a valid UUID"),
];


ShopRouter.post("/create", validate(validateCreateShop), ShopController.createShop);
ShopRouter.get("/all", ShopController.getAllShops);
ShopRouter.get("/:id", validate(validateGetShopById), ShopController.getShopById);
ShopRouter.put("/update/:id", validate(validateUpdateShop), ShopController.updateShop);
ShopRouter.delete("/delete/:id", validate(validateDeleteShop), ShopController.deleteShop);

module.exports = ShopRouter;
