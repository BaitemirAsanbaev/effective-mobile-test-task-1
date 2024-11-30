const { Router } = require("express");
const ItemController = require("./controller");
const validate = require("../utils/middleware");
const { body, param } = require("express-validator");

const ItemRouter = new Router();

// Validation middlewares
const validateParamPlu = [
  param("plu")
    .notEmpty()
    .withMessage("PLU is required")
    .isUUID()
    .withMessage("PLU must be a valid UUID"),
];
const validateParamName = [
  param("name")
    .notEmpty()
    .withMessage("Name is required"),
];
const validateBodyName = [
  `body("name")
    .notEmpty()
    .withMessage("Name is required")`,
];

/**
 * @swagger
 * tags:
 *   name: Items
 *   description: API for managing items
 */

/**
 * @swagger
 * /item/create:
 *   post:
 *     summary: Create a new item
 *     tags: [Items]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Item Name"
 *     responses:
 *       201:
 *         description: Item created successfully
 *       400:
 *         description: Invalid input
 */
ItemRouter.post("/create", validate(validateBodyName), ItemController.createItem);

/**
 * @swagger
 * /item/all:
 *   get:
 *     summary: Get all items
 *     tags: [Items]
 *     responses:
 *       200:
 *         description: List of all items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   plu:
 *                     type: string
 *                   name:
 *                     type: string
 *       500:
 *         description: Internal Server Error
 */
ItemRouter.get("/all", ItemController.getAllItems);

/**
 * @swagger
 * /item/name/{name}:
 *   get:
 *     summary: Get an item by its name
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *           example: "Item Name"
 *     responses:
 *       200:
 *         description: An item
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 plu:
 *                   type: string
 *                 name:
 *                   type: string
 *       404:
 *         description: Item not found
 */
ItemRouter.get("/name/:name", validate(validateParamName), ItemController.getItemByName);

/**
 * @swagger
 * /item/update/{plu}:
 *   put:
 *     summary: Update an existing item
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: plu
 *         required: true
 *         schema:
 *           type: string
 *           example: "e4d909c290d0fb1ca068ffaddf22cbd0"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Item Name"
 *     responses:
 *       200:
 *         description: Item updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Item not found
 */
ItemRouter.put("/update/:plu", validate([...validateParamPlu, ...validateBodyName]), ItemController.updateItem);

/**
 * @swagger
 * /item/{plu}:
 *   get:
 *     summary: Get an item by PLU
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: plu
 *         required: true
 *         schema:
 *           type: string
 *           example: "e4d909c290d0fb1ca068ffaddf22cbd0"
 *     responses:
 *       200:
 *         description: An item
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 plu:
 *                   type: string
 *                 name:
 *                   type: string
 *       404:
 *         description: Item not found
 */
ItemRouter.get("/:plu", validate(validateParamPlu), ItemController.getItemByPlu);

/**
 * @swagger
 * /item/delete/{plu}:
 *   delete:
 *     summary: Delete an item by PLU
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: plu
 *         required: true
 *         schema:
 *           type: string
 *           example: "e4d909c290d0fb1ca068ffaddf22cbd0"
 *     responses:
 *       200:
 *         description: Item deleted successfully
 *       404:
 *         description: Item not found
 */
ItemRouter.delete("/delete/:plu", validate(validateParamPlu), ItemController.deleteItem);

module.exports = ItemRouter;
