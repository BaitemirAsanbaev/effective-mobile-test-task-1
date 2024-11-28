const { Router } = require("express");
const InventoryController = require("./controller");
const validate = require("../utils/middleware");
const { body, param } = require("express-validator");

const InventoryRouter = new Router();

// Validation middlewares
const validateParamItemPlu = [
  param("item_plu")
    .notEmpty()
    .withMessage("Item PLU is required")
    .isUUID()
    .withMessage("Item PLU must be a valid UUID"),
];

const validateParamShopID = [
  param("shop_id").notEmpty().withMessage("Item Shop ID is required"),
];

const validateItemPlu = [
  body("item_plu")
    .notEmpty()
    .withMessage("Item PLU is required")
    .isUUID()
    .withMessage("Item PLU must be a valid UUID"),
];

const validateShopID = [
  body("shop_id").notEmpty().withMessage("Item Shop ID is required"),
];

const validateAmount = [
  body("amount")
    .notEmpty()
    .withMessage("Item Amount field is required")
    .isInt()
    .withMessage("Amount must be number"),
];

const validateFromTo = [
  body("from").notEmpty().withMessage("From field is required"),
  body("to").notEmpty().withMessage("To field is required"),
];

const validateAction = [
  ...validateItemPlu,
  ...validateShopID,
  ...validateAmount,
];

/**
 * @swagger
 * tags:
 *   name: Inventory
 *   description: API for managing inventory
 */

/**
 * @swagger
 * /inventory/create:
 *   post:
 *     summary: Create a new inventory entry
 *     tags: [Inventory]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               item_plu:
 *                 type: string
 *                 example: "e4d909c290d0fb1ca068ffaddf22cbd0"
 *               shop_id:
 *                 type: string
 *                 example: "1"
 *     responses:
 *       201:
 *         description: Inventory created successfully
 *       400:
 *         description: Invalid input
 */
InventoryRouter.post(
  "/create",
  validate([...validateItemPlu, ...validateShopID]),
  InventoryController.createInventory
);

/**
 * @swagger
 * /inventory/by-item/{item_plu}:
 *   get:
 *     summary: Get inventory by item PLU
 *     tags: [Inventory]
 *     parameters:
 *       - in: path
 *         name: item_plu
 *         required: true
 *         schema:
 *           type: string
 *           example: "e4d909c290d0fb1ca068ffaddf22cbd0"
 *     responses:
 *       200:
 *         description: Inventory data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 item_plu:
 *                   type: string
 *                   example: "e4d909c290d0fb1ca068ffaddf22cbd0"
 *                 shop_id:
 *                   type: string
 *                   example: "1"
 *                 available_amount:
 *                   type: integer
 *                   example: 100
 *       404:
 *         description: Item not found
 */
InventoryRouter.get(
  "/by-item/:item_plu",
  validate(validateParamItemPlu),
  InventoryController.getInventoryByItemPlu
);

/**
 * @swagger
 * /inventory/by-shop/{shop_id}:
 *   get:
 *     summary: Get inventory by shop ID
 *     tags: [Inventory]
 *     parameters:
 *       - in: path
 *         name: shop_id
 *         required: true
 *         schema:
 *           type: string
 *           example: "1"
 *     responses:
 *       200:
 *         description: Inventory data
 *       404:
 *         description: Shop not found
 */
InventoryRouter.get(
  "/by-shop/:shop_id",
  validate(validateParamShopID),
  InventoryController.getInventoryByShopId
);

/**
 * @swagger
 * /inventory/by-ordered:
 *   get:
 *     summary: Get inventory by ordered amount range
 *     tags: [Inventory]
 *     parameters:
 *       - in: body
 *         name: amount_range
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             from:
 *               type: integer
 *               example: 10
 *             to:
 *               type: integer
 *               example: 100
 *     responses:
 *       200:
 *         description: List of inventory items within the ordered amount range
 */
InventoryRouter.get(
  "/by-ordered",
  validate(validateFromTo),
  InventoryController.getInventoryByOrderedAmount
);

/**
 * @swagger
 * /inventory/by-available:
 *   get:
 *     summary: Get inventory by available amount range
 *     tags: [Inventory]
 *     parameters:
 *       - in: body
 *         name: amount_range
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             from:
 *               type: integer
 *               example: 10
 *             to:
 *               type: integer
 *               example: 100
 *     responses:
 *       200:
 *         description: List of inventory items within the available amount range
 */
InventoryRouter.get(
  "/by-available",
  validate(validateFromTo),
  InventoryController.getInventoryByAvailableAmount
);

/**
 * @swagger
 * /inventory/all:
 *   get:
 *     summary: Get all inventory records
 *     tags: [Inventory]
 *     responses:
 *       200:
 *         description: List of all inventory items
 *       500:
 *         description: Internal server error
 */
InventoryRouter.get("/all", InventoryController.getAllInventorys);

/**
 * @swagger
 * /inventory/increase/available:
 *   put:
 *     summary: Increase available amount of inventory
 *     tags: [Inventory]
 *     parameters:
 *       - in: body
 *         name: inventory_action
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             item_plu:
 *               type: string
 *               example: "e4d909c290d0fb1ca068ffaddf22cbd0"
 *             shop_id:
 *               type: string
 *               example: "1"
 *             amount:
 *               type: integer
 *               example: 10
 *     responses:
 *       200:
 *         description: Inventory available amount increased
 *       400:
 *         description: Invalid input
 */
InventoryRouter.put(
  "/increase/available",
  validate(validateAction),
  InventoryController.increaseAvailable
);

/**
 * @swagger
 * /inventory/decrease/available:
 *   put:
 *     summary: Decrease available amount of inventory
 *     tags: [Inventory]
 *     parameters:
 *       - in: body
 *         name: inventory_action
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             item_plu:
 *               type: string
 *               example: "e4d909c290d0fb1ca068ffaddf22cbd0"
 *             shop_id:
 *               type: string
 *               example: "1"
 *             amount:
 *               type: integer
 *               example: 5
 *     responses:
 *       200:
 *         description: Inventory available amount decreased
 *       400:
 *         description: Invalid input
 */
InventoryRouter.put(
  "/decrease/available",
  validate(validateAction),
  InventoryController.decreaseAvailable
);

/**
 * @swagger
 * /inventory/increase/ordered:
 *   put:
 *     summary: Increase ordered amount of inventory
 *     tags: [Inventory]
 *     parameters:
 *       - in: body
 *         name: inventory_action
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             item_plu:
 *               type: string
 *               example: "e4d909c290d0fb1ca068ffaddf22cbd0"
 *             shop_id:
 *               type: string
 *               example: "1"
 *             amount:
 *               type: integer
 *               example: 15
 *     responses:
 *       200:
 *         description: Inventory ordered amount increased
 *       400:
 *         description: Invalid input
 */
InventoryRouter.put(
  "/increase/ordered",
  validate(validateAction),
  InventoryController.increaseOrdered
);

/**
 * @swagger
 * /inventory/decrease/ordered:
 *   put:
 *     summary: Decrease ordered amount of inventory
 *     tags: [Inventory]
 *     parameters:
 *       - in: body
 *         name: inventory_action
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             item_plu:
 *               type: string
 *               example: "e4d909c290d0fb1ca068ffaddf22cbd0"
 *             shop_id:
 *               type: string
 *               example: "1"
 *             amount:
 *               type: integer
 *               example: 5
 *     responses:
 *       200:
 *         description: Inventory ordered amount decreased
 *       400:
 *         description: Invalid input
 */
InventoryRouter.put(
  "/decrease/ordered",
  validate(validateAction),
  InventoryController.decreaseOrdered
);

/**
 * @swagger
 * /inventory/order:
 *   put:
 *     summary: Order inventory item
 *     tags: [Inventory]
 *     parameters:
 *       - in: body
 *         name: inventory_action
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             item_plu:
 *               type: string
 *               example: "e4d909c290d0fb1ca068ffaddf22cbd0"
 *             shop_id:
 *               type: string
 *               example: "1"
 *             amount:
 *               type: integer
 *               example: 10
 *     responses:
 *       200:
 *         description: Inventory ordered
 *       400:
 *         description: Invalid input
 */
InventoryRouter.put(
  "/order",
  validate(validateAction),
  InventoryController.orderItem
);

/**
 * @swagger
 * /inventory/refund:
 *   put:
 *     summary: Refund inventory item
 *     tags: [Inventory]
 *     parameters:
 *       - in: body
 *         name: inventory_action
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             item_plu:
 *               type: string
 *               example: "e4d909c290d0fb1ca068ffaddf22cbd0"
 *             shop_id:
 *               type: string
 *               example: "1"
 *             amount:
 *               type: integer
 *               example: 5
 *     responses:
 *       200:
 *         description: Inventory refunded
 *       400:
 *         description: Invalid input
 */
InventoryRouter.put(
  "/refund",
  validate(validateAction),
  InventoryController.refundItem
);

/**
 * @swagger
 * /inventory/delete:
 *   delete:
 *     summary: Delete inventory entry
 *     tags: [Inventory]
 *     parameters:
 *       - in: body
 *         name: inventory_action
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             item_plu:
 *               type: string
 *               example: "e4d909c290d0fb1ca068ffaddf22cbd0"
 *             shop_id:
 *               type: string
 *               example: "1"
 *     responses:
 *       200:
 *         description: Inventory deleted
 *       400:
 *         description: Invalid input
 */
InventoryRouter.delete(
  "/delete",
  validate([...validateItemPlu, ...validateShopID]),
  InventoryController.deleteInventory
);

module.exports = InventoryRouter;
