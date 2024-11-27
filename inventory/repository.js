const { pool } = require('../db');

const createItemRepo = async (plu, name) => {
    return await pool.query("INSERT INTO item (plu, name) VALUES ($1, $2) RETURNING *", [plu, name]);
};

module.exports = { createItemRepo };
