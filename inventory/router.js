const { Router } = require("express");
const inventoryController = require("./controller");
const validate = require("./middleware");
const { body, param } = require("express-validator");

const inventoryRouter = new Router();


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


inventoryRouter.post("/create", validate(validateCreateItem), inventoryController.createItem);
inventoryRouter.get("/:plu", validate(validateGetItemByPlu), inventoryController.getItemByPlu);
inventoryRouter.get("/name/:name", validate(validateGetItemByName), inventoryController.getItemByName);
inventoryRouter.get("/all", inventoryController.getAllItems);
inventoryRouter.put("/update/:plu", validate(validateUpdateItem), inventoryController.updateItem);
inventoryRouter.delete("/delete/:plu", validate(validateDeleteItem), inventoryController.deleteItem);

module.exports = inventoryRouter;
