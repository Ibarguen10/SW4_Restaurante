const db = require('../config/db');

class Review {
  // Crear una reseña
  static async create(restaurant_id, user_id, rating, comment) {
    return new Promise((resolve, reject) => {
      db.query(
        'INSERT INTO reviews (restaurant_id, user_id, rating, comment) VALUES (?, ?, ?, ?)',
        [restaurant_id, user_id, rating, comment],
        (err, result) => {
          if (err) return reject(err);
          resolve(result.insertId);
        }
      );
    });
  }

  // Obtener reseñas por restaurante
  static async findByRestaurantId(restaurant_id) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM reviews WHERE restaurant_id = ?', [restaurant_id], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }
}

module.exports = Review;