const db = require('../config/db');

const restaurantController = {
  getRestaurants: (req, res) => {
    const query = 'SELECT * FROM restaurants';
    db.query(query, (err, results) => {
      if (err) return res.status(500).json({ message: 'Error en la consulta', err });
      res.status(200).json(results);
    });
  },

  getRestaurantById: (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM restaurants WHERE id = ?';
    db.query(query, [id], (err, result) => {
      if (err) return res.status(500).json({ message: 'Error en la consulta', err });
      if (result.length === 0) return res.status(404).json({ message: 'Restaurante no encontrado' });
      res.status(200).json(result[0]);
    });
  },

  createRestaurant: (req, res) => {
    const { name, latitude, longitude, cuisine_type } = req.body;
    if (!name || !latitude || !longitude) {
      return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }
    const query = 'INSERT INTO restaurants (name, latitude, longitude, cuisine_type, user_id) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [name, latitude, longitude, cuisine_type, req.user.id], (err, result) => {
      if (err) return res.status(500).json({ message: 'Error creando restaurante', err });
      res.status(201).json({ message: 'Restaurante creado', id: result.insertId });
    });
  },

  updateRestaurant: (req, res) => {
    const { id } = req.params;
    const { name, latitude, longitude, cuisine_type } = req.body;
    const query = 'UPDATE restaurants SET name = ?, latitude = ?, longitude = ?, cuisine_type = ? WHERE id = ? AND user_id = ?';
    db.query(query, [name, latitude, longitude, cuisine_type, id, req.user.id], (err, result) => {
      if (err) return res.status(500).json({ message: 'Error actualizando restaurante', err });
      if (result.affectedRows === 0) return res.status(404).json({ message: 'Restaurante no encontrado o no autorizado' });
      res.status(200).json({ message: 'Restaurante actualizado' });
    });
  },

  deleteRestaurant: (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM restaurants WHERE id = ? AND user_id = ?';
    db.query(query, [id, req.user.id], (err, result) => {
      if (err) return res.status(500).json({ message: 'Error eliminando restaurante', err });
      if (result.affectedRows === 0) return res.status(404).json({ message: 'Restaurante no encontrado o no autorizado' });
      res.status(200).json({ message: 'Restaurante eliminado' });
    });
  },

  filterRestaurants: (req, res) => {
    const { cuisine_type, latitude, longitude, rating } = req.query;
    let query = 'SELECT r.* FROM restaurants r LEFT JOIN reviews rv ON r.id = rv.restaurant_id';
    let conditions = [];
    let params = [];

    if (cuisine_type) {
      conditions.push('r.cuisine_type = ?');
      params.push(cuisine_type);
    }
    if (latitude && longitude) {
      conditions.push(`(6371 * acos(cos(radians(?)) * cos(radians(r.latitude)) * cos(radians(r.longitude) - radians(?)) + sin(radians(?)) * sin(radians(r.latitude)))) < 10`);
      params.push(latitude, longitude, latitude);
    }
    if (rating) {
      query += ' GROUP BY r.id HAVING AVG(rv.rating) >= ?';
      params.push(rating);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    db.query(query, params, (err, results) => {
      if (err) return res.status(500).json({ message: 'Error filtrando restaurantes', err });
      res.status(200).json(results);
    });
  },
};

module.exports = restaurantController;