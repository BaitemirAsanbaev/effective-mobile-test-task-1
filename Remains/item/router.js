const { Router } = require("express");
const ItemController = require("./controller");
const validate = require("../../middleware");
const { body, param } = require("express-validator");

const ItemRouter = new Router();


const validateCreateItem = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string"),
];

const validateGetItemByPlu = [
  param("plu")
    .notEmpty()
    .withMessage("PLU is required")
    .isUUID()
    .withMessage("PLU must be a valid UUID"),
];

const validateGetItemByName = [
    param("name")
      .notEmpty()
      .withMessage("Name is required"),
  ];
  
const validateUpdateItem = [
  param("plu")
    .notEmpty()
    .withMessage("PLU is required")
    .isUUID()
    .withMessage("PLU must be a valid UUID"),
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string"),
];

const validateDeleteItem = [
  param("plu")
    .notEmpty()
    .withMessage("PLU is required")
    .isUUID()
    .withMessage("PLU must be a valid UUID"),
];


ItemRouter.post("/create", validate(validateCreateItem), ItemController.createItem);
ItemRouter.get("/:plu", validate(validateGetItemByPlu), ItemController.getItemByPlu);
ItemRouter.get("/name/:name", validate(validateGetItemByName), ItemController.getItemByName);
ItemRouter.get("/all", ItemController.getAllItems);
ItemRouter.put("/update/:plu", validate(validateUpdateItem), ItemController.updateItem);
ItemRouter.delete("/delete/:plu", validate(validateDeleteItem), ItemController.deleteItem);

module.exports = ItemRouter;
