const { pool } = require("../db");
class InventoryRepo {
  createItem = async (plu, name) => {
    try {
      return await pool.query(
        "INSERT INTO item (plu, name) VALUES ($1, $2) RETURNING *",
        [plu, name]
      );
    } catch (e) {
      throw e;
    }
  };
}

module.exports = new InventoryRepo();
