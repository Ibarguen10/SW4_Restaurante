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
      res.status(500).json({ message: 'Error al crear reseña', error: err.message });
    }
  }

  static async findByRestaurantId(req, res) {
    const { restaurantId } = req.params;
    try {
      const reviews = await Review.findByRestaurantId(Number(restaurantId));
      if (reviews.length === 0) {
        return res.status(404).json({ message: 'No se encontraron reseñas para este restaurante' });
      }
      res.status(200).json(reviews);
    } catch (err) {
      res.status(500).json({ message: 'Error al obtener reseñas', error: err.message });
    }
  }

  static async updateReview(req, res) {
    const { restaurant_id, rating, comment } = req.body;
    const { id } = req.params;

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
      const updated = await Review.update(Number(id), restaurant_id, rating, comment);
      if (updated === 0) {
        return res.status(404).json({ message: 'Reseña no encontrada' });
      }
      res.status(200).json({ message: 'Reseña actualizada' });
    } catch (err) {
      res.status(500).json({ message: 'Error al actualizar reseña', error: err.message });
    }
  }

  static async deleteReview(req, res) {
    const { id } = req.params;

    try {
      const deleted = await Review.delete(Number(id));
      if (deleted === 0) {
        return res.status(404).json({ message: 'Reseña no encontrada' });
      }
      res.status(200).json({ message: 'Reseña eliminada' });
    } catch (err) {
      res.status(500).json({ message: 'Error al eliminar reseña', error: err.message });
    }
  }
}

module.exports = ReviewController;
