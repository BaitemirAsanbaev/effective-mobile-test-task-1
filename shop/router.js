const { Router } = require("express");
const ShopController = require("./controller");
const validate = require("../utils/middleware");
const { body, param } = require("express-validator");

const ShopRouter = new Router();

// Validation middlewares
const validateParamId = [
  param("plu")
    .notEmpty()
    .withMessage("PLU is required")
    .isUUID()
    .withMessage("PLU must be a valid UUID"),
];
const validateBodyName = [
  body("name")
    .notEmpty()
    .withMessage("Name is required"),
];

/**
 * @swagger
 * tags:
 *   name: Shops
 *   description: API for managing shops
 */

/**
 * @swagger
 * /shop/create:
 *   post:
 *     summary: Create a new shop
 *     tags: [Shops]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Shop Name"
 *     responses:
 *       201:
 *         description: Shop created successfully
 *       400:
 *         description: Invalid input
 */
ShopRouter.post("/create", validate(validateBodyName), ShopController.createShop);

/**
 * @swagger
 * /shop/all:
 *   get:
 *     summary: Get all shops
 *     tags: [Shops]
 *     responses:
 *       200:
 *         description: List of all shops
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *       500:
 *         description: Internal Server Error
 */
ShopRouter.get("/all", ShopController.getAllShops);

/**
 * @swagger
 * /shop/{id}:
 *   get:
 *     summary: Get a shop by ID
 *     tags: [Shops]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "e4d909c290d0fb1ca068ffaddf22cbd0"
 *     responses:
 *       200:
 *         description: A shop
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *       404:
 *         description: Shop not found
 */
ShopRouter.get("/:id", validate(validateParamId), ShopController.getShopById);

/**
 * @swagger
 * /shop/update/{id}:
 *   put:
 *     summary: Update an existing shop
 *     tags: [Shops]
 *     parameters:
 *       - in: path
 *         name: id
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
 *                 example: "Updated Shop Name"
 *     responses:
 *       200:
 *         description: Shop updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Shop not found
 */
ShopRouter.put("/update/:id", validate([...validateParamId, ...validateBodyName]), ShopController.updateShop);

/**
 * @swagger
 * /shop/delete/{id}:
 *   delete:
 *     summary: Delete a shop by ID
 *     tags: [Shops]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "e4d909c290d0fb1ca068ffaddf22cbd0"
 *     responses:
 *       200:
 *         description: Shop deleted successfully
 *       404:
 *         description: Shop not found
 */
ShopRouter.delete("/delete/:id", validate(validateParamId), ShopController.deleteShop);

module.exports = ShopRouter;
