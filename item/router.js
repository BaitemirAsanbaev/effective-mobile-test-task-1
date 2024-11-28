const { Router } = require("express");
const ItemController = require("./controller");
const validate = require("../middleware");
const { body, param } = require("express-validator");

const ItemRouter = new Router();

const validateParamPlu = [
  param("plu")
    .notEmpty()
    .withMessage("PLU is required")
    .isUUID()
    .withMessage("PLU must be a valid UUID"),
]
const validateParamName = [
  param("name")
      .notEmpty()
      .withMessage("Name is required"),
]
const validateBodyName = [
  body("name")
      .notEmpty()
      .withMessage("Name is required"),
]


ItemRouter.post("/create", validate(validateBodyName), ItemController.createItem);
ItemRouter.get("/all", ItemController.getAllItems);
ItemRouter.get("/name/:name", validate(validateParamName), ItemController.getItemByName);
ItemRouter.put("/update/:plu", validate([...validateParamPlu, ...validateBodyName]), ItemController.updateItem);
ItemRouter.get("/:plu", validate(validateParamPlu), ItemController.getItemByPlu);
ItemRouter.delete("/delete/:plu", validate(validateParamPlu), ItemController.deleteItem);

module.exports = ItemRouter;
