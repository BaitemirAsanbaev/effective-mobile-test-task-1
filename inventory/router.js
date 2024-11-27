const { Router } = require('express');
const inventoryController = require('./controller');

const inventoryRouter = new Router();

inventoryRouter.post("/create", inventoryController.createItem);

module.exports = inventoryRouter;
