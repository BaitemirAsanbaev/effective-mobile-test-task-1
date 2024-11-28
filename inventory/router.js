const { Router } = require("express");
const InventoryController = require("./controller");
const validate = require("../middleware");
const { body, param } = require("express-validator");

const InventoryRouter = new Router();


const validateParamItemPlu = [
  param("item_plu")
    .notEmpty()
    .withMessage("Item PLU is required")
    .isUUID()
    .withMessage("Item PLU must be a valid UUID"),
]

const validateParamShopID = [
  param("shop_id")
    .notEmpty()
    .withMessage("Item Shop ID is required")
]

const validateItemPlu = [
  body("item_plu")
    .notEmpty()
    .withMessage("Item PLU is required")
    .isUUID()
    .withMessage("Item PLU must be a valid UUID"),
]

const validateShopID = [
  body("shop_id")
    .notEmpty()
    .withMessage("Item Shop ID is required")
]

const validateAmount = [
  body("amount")
    .notEmpty()
    .withMessage("Item Amount field is required")
    .isInt()
    .withMessage("Amount must be number")
]
const validateFromTo = [
  body("from")
    .notEmpty()
    .withMessage("From field is required"),
  body("to")
    .notEmpty()
    .withMessage("To field is required"),
    
]

const validateAction = [...validateItemPlu, ...validateShopID, ...validateAmount]


InventoryRouter.post("/create", validate([...validateItemPlu, ...validateShopID]), InventoryController.createInventory);
InventoryRouter.get("/by-item/:item_plu", validate(validateParamItemPlu), InventoryController.getInventoryByItemPlu);
InventoryRouter.get("/by-shop/:shop_id", validate(validateParamShopID), InventoryController.getInventoryByShopId);
InventoryRouter.get("/by-ordered", validate(validateFromTo), InventoryController.getInventoryByOrderedAmount);
InventoryRouter.get("/by-available", validate(validateFromTo), InventoryController.getInventoryByAvailableAmount);
InventoryRouter.get("/all", InventoryController.getAllInventorys);
InventoryRouter.put("/increase/available", validate(validateAction), InventoryController.increaseAvailable);
InventoryRouter.put("/decrease/available", validate(validateAction), InventoryController.decreaseAvailable);
InventoryRouter.put("/increase/ordered", validate(validateAction), InventoryController.increaseOrdered);
InventoryRouter.put("/decrease/ordered", validate(validateAction), InventoryController.decreaseOrdered);
InventoryRouter.put("/order", validate(validateAction), InventoryController.orderItem);
InventoryRouter.put("/refund", validate(validateAction), InventoryController.refundItem);
InventoryRouter.delete("/delete", validate([...validateItemPlu, ...validateShopID]), InventoryController.deleteInventory);

module.exports = InventoryRouter;
