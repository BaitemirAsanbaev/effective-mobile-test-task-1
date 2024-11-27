const { Router } = require('express');
const inventoryController = require('./controller');

const inventoryRouter = new Router();

inventoryRouter.post("/create", inventoryController.createItem);
inventoryRouter.get("/:plu", inventoryController.getItemByPlu);
inventoryRouter.get("/:name", inventoryController.getItemByName);
inventoryRouter.get("/all", inventoryController.getAllItems);
inventoryRouter.put("/update/:plu", inventoryController.updateItem);
inventoryRouter.delete("/delete/:plu", inventoryController.deleteItem);

module.exports = inventoryRouter;
