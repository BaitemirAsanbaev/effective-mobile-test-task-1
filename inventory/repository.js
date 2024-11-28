const { pool } = require("../db");
class InventoryRepo {
  createInventory = async (item_plu, shop_id, amount) => {
    try {
      return await pool.query(
        "INSERT INTO inventory (item_plu, shop_id, ordered_amount, available_amount) VALUES ($1, $2, $3, $4) RETURNING *",
        [item_plu, shop_id, 0, amount]
      );
    } catch (e) {
      throw e;
    }
  };
  getInventory = async (item_plu, shop_id) => {
    try {
      return await pool.query('SELECT * FROM inventory WHERE "item_plu"=$1 AND shop_id=$2', [
        item_plu,
        shop_id
      ]);
    } catch (e) {
      throw e;
    }
  };
  getInventoryByItemPlu = async (item_plu) => {
    try {
      return await pool.query('SELECT * FROM inventory WHERE "item_plu"=$1', [
        item_plu,
      ]);
    } catch (e) {
      throw e;
    }
  };
  getInventoryByShopId = async (shop_id) => {
    try {
      return await pool.query('SELECT * FROM inventory WHERE "shop_id"=$1', [
        shop_id,
      ]);
    } catch (e) {
      throw e;
    }
  };
  getInventoryByOrderedAmount = async (from, to) => {
    try {
      return await pool.query('SELECT * FROM inventory WHERE "ordered_amount" BETWEEN $1 AND $2', [
        from,
        to
      ]);
    } catch (e) {
      throw e;
    }
  };

  getInventoryByAvailableAmount = async (from, to) => {
    try {
      return await pool.query('SELECT * FROM inventory WHERE "available_amount" BETWEEN $1 AND $2', [
        from,
        to
      ]);
    } catch (e) {
      throw e;
    }
  };
  
  getAllInventorys = async () => {
    try {
      return await pool.query("SELECT * FROM inventory");
    } catch (e) {
      throw e;
    }
  };
  updateInventory = async (item_plu, shop_id, ordered_amount, available_amount) => {
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
