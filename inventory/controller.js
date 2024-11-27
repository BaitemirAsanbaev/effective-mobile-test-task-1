const { BadRequest, NotFound } = require("./errors");
const InventoryService = require("./service");
const { notNullValidator } = require("./validator");

class InventoryController {
  async createItem(req, res) {
    const { name } = req.body;
    try {
      notNullValidator({ name });
      const item = await InventoryService.createItem(name);
      return res.json(item);
    } catch (e) {
      if (e.code === "23505") {
        return BadRequest(res, `Item with name ${name} already exists`);
      }
      return res.status(e.statusCode).json({ message: e.message });
    }
  }
  async getItemByPlu(req, res) {
    const plu  = req.params.plu;
    try {
      notNullValidator({ plu });
      const item = await InventoryService.getItemByPlu(plu);
      return res.json(item);
    } catch (e) {
      if (e.code === "23503") {
        return NotFound(res, `Item with plu ${plu} was not found`);
      }
      return res.status(e.statusCode).json({ message: e.message });
    }
  }
  async getItemByName(req, res) {
    const  name  = req.params.name;
    try {
      notNullValidator({ name });
      const item = await InventoryService.getItemByName(name);
      return res.json(item);
    } catch (e) {
      if (e.code === "23503") {
        return NotFound(res, `Item with name ${name} was not found`);
      }
      return res.status(e.statusCode).json({ message: e.message });
    }
  }
  async getAllItems(req, res) {
    try {
      const item = await InventoryService.getAllItems();
      return res.json(item);
    } catch (e) {
      return res.status(e.statusCode).json({ message: e.message });
    }
  }
  async updateItem(req, res) {
    const plu = req.params.plu
    const { name } = req.body;
    try {
      notNullValidator({ name });
      notNullValidator({ plu });
      const item = await InventoryService.updateItem();
      return res.json(item);
    } catch (e) {
      return res.status(e.statusCode).json({ message: e.message });
    }
  }
  async deleteItem(req, res) {
    const plu = req.params.plu
    try {
      notNullValidator({ plu });
      const item = await InventoryService.deleteItem(plu);
      return res.json(item);
    } catch (e) {
      return res.status(e.statusCode).json({ message: e.message });
    }
  }
}

module.exports = new InventoryController();
