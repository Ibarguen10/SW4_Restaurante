const Restaurant = require('../models/restaurant');

class RestaurantController {
  static async create(req, res) {
    const { name, latitude, longitude, cuisine_type } = req.body;

    if (!name || typeof name !== 'string' || name.length < 3 || name.length > 100) {
      return res.status(400).json({ message: 'El nombre debe tener entre 3 y 100 caracteres' });
    }
    if (typeof latitude !== 'number' || typeof longitude !== 'number') {
      return res.status(400).json({ message: 'Latitude y longitude deben ser números' });
    }
    if (!cuisine_type || typeof cuisine_type !== 'string' || cuisine_type.length > 50) {
      return res.status(400).json({ message: 'El tipo de cocina es requerido y debe tener máximo 50 caracteres' });
    }

    try {
      const user_id = req.user.id;
      const restaurantId = await Restaurant.create(name, latitude, longitude, cuisine_type, user_id);
      res.status(201).json({ message: 'Restaurante creado', id: restaurantId });
    } catch (err) {
      throw err;
    }
  }

  static async findAll(req, res) {
    try {
      const restaurants = await Restaurant.findAll();
      res.status(200).json(restaurants);
    } catch (err) {
      throw err;
    }
  }

  static async findById(req, res) {
    try {
      const restaurant = await Restaurant.findById(req.params.id);
      if (!restaurant) return res.status(404).json({ message: 'Restaurante no encontrado' });
      res.status(200).json(restaurant);
    } catch (err) {
      throw err;
    }
  }

  static async update(req, res) {
    const { name, latitude, longitude, cuisine_type } = req.body;

    if (!name || typeof name !== 'string' || name.length < 3 || name.length > 100) {
      return res.status(400).json({ message: 'El nombre debe tener entre 3 y 100 caracteres' });
    }
    if (typeof latitude !== 'number' || typeof longitude !== 'number') {
      return res.status(400).json({ message: 'Latitude y longitude deben ser números' });
    }
    if (!cuisine_type || typeof cuisine_type !== 'string' || cuisine_type.length > 50) {
      return res.status(400).json({ message: 'El tipo de cocina es requerido y debe tener máximo 50 caracteres' });
    }

    try {
      const updated = await Restaurant.update(req.params.id, name, latitude, longitude, cuisine_type);
      if (updated === 0) return res.status(404).json({ message: 'Restaurante no encontrado' });
      res.status(200).json({ message: 'Restaurante actualizado' });
    } catch (err) {
      throw err;
    }
  }

  static async delete(req, res) {
    try {
      const deleted = await Restaurant.delete(req.params.id);
      if (deleted === 0) return res.status(404).json({ message: 'Restaurante no encontrado' });
      res.status(200).json({ message: 'Restaurante eliminado' });
    } catch (err) {
      throw err;
    }
  }

  static async getRecommendations(req, res) {
    try {
      const [rows] = await db.promise().query(
        'SELECT r.*, AVG(re.rating) as average_rating FROM restaurants r LEFT JOIN reviews re ON r.id = re.restaurant_id GROUP BY r.id ORDER BY average_rating DESC LIMIT 5'
      );
      res.status(200).json(rows);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = RestaurantController;