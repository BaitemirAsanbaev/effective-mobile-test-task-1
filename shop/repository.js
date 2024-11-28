const { pool } = require("../db/db");
class ShopRepo {
  createShop = async (name) => {
    try {
      return await pool.query(
        "INSERT INTO shop (name) VALUES ($1) RETURNING *",
        [name]
      );
    } catch (e) {
      throw e;
    }
  };
  getShopById = async (id) => {
    try {
      return await pool.query('SELECT * FROM shop WHERE "id"=$1', [id]);
    } catch (e) {
      throw e;
    }
  };
  getAllShops = async () => {
    try {
      return await pool.query('SELECT * FROM shop');
    } catch (e) {
      throw e;
    }
  };
  updateShop = async (id, name) => {
    try {
      return await pool.query('UPDATE shop SET name=$1 WHERE id=$2 RETURNING *', [name, id]);
    } catch (e) {
      throw e;
    }
  };
  deleteShop = async (id) => {
    try {
      return await pool.query('DELETE FROM shop WHERE id=$1 RETURNING *', [id]);
    } catch (e) {
      throw e;
    }
  };
}

module.exports = new ShopRepo();
