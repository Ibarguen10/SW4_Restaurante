const db = require('../config/db');

class Notification {
  static async create(user_id, message, read) {
    const [result] = await db.promise().query(
      'INSERT INTO notifications (user_id, message, read) VALUES (?, ?, ?)',
      [user_id, message, read]
    );
    return result.insertId;
  }

  static async findByUserId(user_id) {
    const [rows] = await db.promise().query(
      'SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC',
      [user_id]
    );
    return rows;
  }
}

module.exports = Notification;