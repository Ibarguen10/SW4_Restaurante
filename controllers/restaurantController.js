const db = require('../config/db');

class RestaurantController {
  static async findAll(req, res) {
    try {
      const [rows] = await db.query('SELECT * FROM restaurants');
      res.status(200).json(rows);
    } catch (err) {
      res.status(500).json({ message: 'Error al obtener restaurantes', error: err.message });
    }
  }

  static async findById(req, res) {
    const { id } = req.params;
    try {
      const [rows] = await db.query('SELECT * FROM restaurants WHERE id = ?', [id]);
      if (rows.length === 0) {
        return res.status(404).json({ message: 'Restaurante no encontrado' });
      }
      res.status(200).json(rows[0]);
    } catch (err) {
      res.status(500).json({ message: 'Error al obtener restaurante', error: err.message });
    }
  }

  static async create(req, res) {
    const { name, latitude, longitude, cuisine_type } = req.body;
    const user_id = req.user?.id;

    if (!name || !latitude || !longitude || !cuisine_type || !user_id) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
      const [result] = await db.query(
        `INSERT INTO restaurants (name, latitude, longitude, cuisine_type, user_id) 
         VALUES (?, ?, ?, ?, ?)`,
        [name, latitude, longitude, cuisine_type, user_id]
      );
      res.status(201).json({ message: 'Restaurante creado', id: result.insertId });
    } catch (err) {
      res.status(500).json({ message: 'Error al crear restaurante', error: err.message });
    }
  }

  static async update(req, res) {
    const { id } = req.params;
    const { name, latitude, longitude, cuisine_type } = req.body;

    try {
      const [result] = await db.query(
        `UPDATE restaurants 
         SET name = ?, latitude = ?, longitude = ?, cuisine_type = ? 
         WHERE id = ?`,
        [name, latitude, longitude, cuisine_type, id]
      );
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Restaurante no encontrado' });
      }
      res.status(200).json({ message: 'Restaurante actualizado' });
    } catch (err) {
      res.status(500).json({ message: 'Error al actualizar restaurante', error: err.message });
    }
  }

  static async delete(req, res) {
    const { id } = req.params;

    try {
      const [result] = await db.query('DELETE FROM restaurants WHERE id = ?', [id]);
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Restaurante no encontrado' });
      }
      res.status(200).json({ message: 'Restaurante eliminado' });
    } catch (err) {
      res.status(500).json({ message: 'Error al eliminar restaurante', error: err.message });
    }
  }

  static async getRecommendations(req, res) {
    try {
      const [rows] = await db.query(
        'SELECT * FROM restaurants ORDER BY RAND() LIMIT 5'
      );
      res.status(200).json(rows);
    } catch (err) {
      res.status(500).json({ message: 'Error al obtener recomendaciones', error: err.message });
    }
  }
}

module.exports = RestaurantController;
