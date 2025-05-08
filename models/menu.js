const db = require('../config/db');

class Menu {
  static async create(restaurant_id, name, price, description, available) {
    const [result] = await db.promise().query(
      'INSERT INTO menus (restaurant_id, name, price, description, available) VALUES (?, ?, ?, ?, ?)',
      [restaurant_id, name, price, description, available]
    );
    return result.insertId;
  }

  static async findByRestaurantId(restaurant_id) {
    const [rows] = await db.promise().query(
      'SELECT * FROM menus WHERE restaurant_id = ?',
      [restaurant_id]
    );
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.promise().query(
      'SELECT * FROM menus WHERE id = ?',
      [id]
    );
    return rows[0];
  }

  static async update(id, name, price, description, available) {
    const [result] = await db.promise().query(
      'UPDATE menus SET name = ?, price = ?, description = ?, available = ? WHERE id = ?',
      [name, price, description, available, id]
    );
    return result.affectedRows;
  }

  static async delete(id) {
    const [result] = await db.promise().query(
      'DELETE FROM menus WHERE id = ?',
      [id]
    );
    return result.affectedRows;
  }
}

module.exports = Menu;