const { pool } = require("../../db");
class ItemRepo {
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
  getItemByPlu = async (plu) => {
    try {
      return await pool.query('SELECT * FROM item WHERE "plu"=$1', [plu]);
    } catch (e) {
      throw e;
    }
  };
  getItemByName = async (name) => {
    try {
      return await pool.query('SELECT * FROM item WHERE "name"=$1', [name]);
    } catch (e) {
      throw e;
    }
  };
  getAllItems = async () => {
    try {
      return await pool.query('SELECT * FROM item');
    } catch (e) {
      throw e;
    }
  };
  updateItem = async (plu, name) => {
    try {
      return await pool.query('UPDATE item SET name=$1 WHERE plu=$2 RETURNING *', [name, plu]);
    } catch (e) {
      throw e;
    }
  };
  deleteItem = async (plu) => {
    try {
      return await pool.query('DELETE FROM item WHERE plu=$1 RETURNING *', [plu]);
    } catch (e) {
      throw e;
    }
  };
}

module.exports = new ItemRepo();
