const { pool } = require("../db/db");
class InventoryRepo {
  createInventory = async (id, item_plu, shop_id, amount) => {
    try {
      return await pool.query(
        "INSERT INTO inventory (id, item_plu, shop_id, ordered_amount, available_amount) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [id, item_plu, shop_id, 0, amount]
      );
    } catch (e) {
      throw e;
    }
  };
  async getInventory({ item_plu, shop_id, from, to, filterType }) {
    try {
      let query = "SELECT * FROM inventory WHERE 1=1";
      const values = [];

      if (item_plu) {
        query += ` AND "item_plu" = $${values.length + 1}`;
        values.push(item_plu);
      }

      if (shop_id) {
        query += ` AND "shop_id" = $${values.length + 1}`;
        values.push(shop_id);
      }

      if (from !== undefined && to !== undefined) {
        if (filterType === "ordered") {
          query += ` AND "ordered_amount" BETWEEN $${values.length + 1} AND $${
            values.length + 2
          }`;
          values.push(from, to);
        } else if (filterType === "available") {
          query += ` AND "available_amount" BETWEEN $${
            values.length + 1
          } AND $${values.length + 2}`;
          values.push(from, to);
        }
      }

      return await pool.query(query, values);
    } catch (e) {
      logger.error("ERROR in repo", e)
      
      throw e;
    }
  }

  getAllInventorys = async () => {
    try {
      return await pool.query("SELECT * FROM inventory");
    } catch (e) {
      throw e;
    }
  };
  updateInventory = async (
    item_plu,
    shop_id,
    ordered_amount,
    available_amount
  ) => {
    try {
      return await pool.query(
        "UPDATE inventory SET ordered_amount=COALESCE($1, ordered_amount), available_amount=COALESCE($2, available_amount) WHERE item_plu=$3 AND shop_id=$4 RETURNING *",
        [ordered_amount, available_amount, item_plu, shop_id]
      );
    } catch (e) {
      throw e;
    }
  };
  deleteInventory = async (item_plu, shop_id) => {
    try {
      return await pool.query(
        "DELETE FROM inventory WHERE item_plu=$1 AND shop_id=$2 RETURNING *",
        [item_plu, shop_id]
      );
    } catch (e) {
      throw e;
    }
  };
}

module.exports = new InventoryRepo();
