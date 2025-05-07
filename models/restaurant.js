const db = require('../config/db');

class Restaurant {
  // Crear un restaurante
  static async create(name, latitude, longitude, cuisine_type, user_id) {
    return new Promise((resolve, reject) => {
      db.query(
        'INSERT INTO restaurants (name, latitude, longitude, cuisine_type, user_id) VALUES (?, ?, ?, ?, ?)',
        [name, latitude, longitude, cuisine_type, user_id],
        (err, result) => {
          if (err) return reject(err);
          resolve(result.insertId);
        }
      );
    });
  }

  // Obtener todos los restaurantes
  static async findAll() {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM restaurants', (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  // Obtener un restaurante por ID
  static async findById(id) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM restaurants WHERE id = ?', [id], (err, results) => {
        if (err) return reject(err);
        resolve(results[0]);
      });
    });
  }

  // Actualizar un restaurante
  static async update(id, name, latitude, longitude, cuisine_type) {
    return new Promise((resolve, reject) => {
      db.query(
        'UPDATE restaurants SET name = ?, latitude = ?, longitude = ?, cuisine_type = ? WHERE id = ?',
        [name, latitude, longitude, cuisine_type, id],
        (err, result) => {
          if (err) return reject(err);
          resolve(result.affectedRows);
        }
      );
    });
  }

  // Eliminar un restaurante
  static async delete(id) {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM restaurants WHERE id = ?', [id], (err, result) => {
        if (err) return reject(err);
        resolve(result.affectedRows);
      });
    });
  }
}

module.exports = Restaurant;