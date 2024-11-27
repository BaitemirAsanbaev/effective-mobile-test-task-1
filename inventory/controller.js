const { CreateItemService } = require("./service");

class InventoryController {
    async createItem(req, res) {
        const { name } = req.body;
        try {
            const item = await CreateItemService(name);
            return res.json(item);
        } catch (e) {
            console.log(e);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

module.exports = new InventoryController();
