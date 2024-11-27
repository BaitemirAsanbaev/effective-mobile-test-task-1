const {BadRequest, ServerError} = require("./errors");
const InventoryService = require("./service");

class InventoryController {
  async createItem(req, res) {
    const { name } = req.body;
    if (!name) {
       return BadRequest(res, "Name field must not be null")
    }
    try {
      const item = await InventoryService.createItem(name);
      return res.json(item);
    } catch (e) {
      console.log(e);
      if (e.code === '23505') {
        return BadRequest(res, `Item with name ${name} already exists`)
      }
      return ServerError(res)
    }
  }
}

module.exports = new InventoryController();
