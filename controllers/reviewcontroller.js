const db = require('../config/db');

const reviewController = {
  getReviews: (req, res) => {
    const { restaurantId } = req.params;
    const query = 'SELECT * FROM reviews WHERE restaurant_id = ?';
    db.query(query, [restaurantId], (err, results) => {
      if (err) return res.status(500).json({ message: 'Error en la consulta', err });
      res.status(200).json(results);
    });
  },

  createReview: (req, res) => {
    const { restaurant_id, rating, comment } = req.body;
    if (!restaurant_id || !rating) {
      return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }
    const query = 'INSERT INTO reviews (restaurant_id, user_id, rating, comment) VALUES (?, ?, ?, ?)';
    db.query(query, [restaurant_id, req.user.id, rating, comment], (err, result) => {
      if (err) return res.status(500).json({ message: 'Error creando reseña', err });
      res.status(201).json({ message: 'Reseña creada', id: result.insertId });
    });
  },

  updateReview: (req, res) => {
    const { id } = req.params;
    const { rating, comment } = req.body;
    const query = 'UPDATE reviews SET rating = ?, comment = ? WHERE id = ? AND user_id = ?';
    db.query(query, [rating, comment, id, req.user.id], (err, result) => {
      if (err) return res.status(500).json({ message: 'Error actualizando reseña', err });
      if (result.affectedRows === 0) return res.status(404).json({ message: 'Reseña no encontrada o no autorizada' });
      res.status(200).json({ message: 'Reseña actualizada' });
    });
  },

  deleteReview: (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM reviews WHERE id = ? AND user_id = ?';
    db.query(query, [id, req.user.id], (err, result) => {
      if (err) return res.status(500).json({ message: 'Error eliminando reseña', err });
      if (result.affectedRows === 0) return res.status(404).json({ message: 'Reseña no encontrada o no autorizada' });
      res.status(200).json({ message: 'Reseña eliminada' });
    });
  },
};

module.exports = reviewController;