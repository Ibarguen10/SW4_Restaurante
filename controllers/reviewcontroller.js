const Review = require('../models/review');

class ReviewController {
  static async create(req, res) {
    const { restaurant_id, rating, comment } = req.body;

    if (!restaurant_id || typeof restaurant_id !== 'number') {
      return res.status(400).json({ message: 'El restaurant_id es requerido y debe ser un número' });
    }
    if (!rating || typeof rating !== 'number' || rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'El rating debe estar entre 1 y 5' });
    }
    if (comment && typeof comment !== 'string' && comment.length > 500) {
      return res.status(400).json({ message: 'El comentario no puede superar los 500 caracteres' });
    }

    try {
      const user_id = req.user.id;
      const reviewId = await Review.create(restaurant_id, user_id, rating, comment);
      res.status(201).json({ message: 'Reseña creada', id: reviewId });
    } catch (err) {
      throw err;
    }
  }

  static async findByRestaurantId(req, res) {
    const { restaurant_id } = req.query;
    if (!restaurant_id || typeof restaurant_id !== 'number') {
      return res.status(400).json({ message: 'Se requiere un restaurant_id válido' });
    }
    try {
      const reviews = await Review.findByRestaurantId(restaurant_id);
      if (reviews.length === 0) {
        return res.status(404).json({ message: 'No se encontraron reseñas para este restaurante' });
      }
      res.status(200).json(reviews);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = ReviewController;