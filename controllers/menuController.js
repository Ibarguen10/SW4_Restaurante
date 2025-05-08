const Menu = require('../models/menu');

class MenuController {
  static async create(req, res) {
    const { restaurant_id, name, price, description, available } = req.body;

    if (!restaurant_id || typeof restaurant_id !== 'number') {
      return res.status(400).json({ message: 'El restaurant_id es requerido y debe ser un número' });
    }
    if (!name || typeof name !== 'string' || name.length < 3 || name.length > 100) {
      return res.status(400).json({ message: 'El nombre debe tener entre 3 y 100 caracteres' });
    }
    if (!price || typeof price !== 'number' || price < 0) {
      return res.status(400).json({ message: 'El precio debe ser un número mayor o igual a 0' });
    }
    if (description && typeof description !== 'string' && description.length > 500) {
      return res.status(400).json({ message: 'La descripción no puede superar los 500 caracteres' });
    }
    if (available === undefined || typeof available !== 'boolean') {
      return res.status(400).json({ message: 'El campo available es requerido y debe ser booleano' });
    }

    try {
      const user_id = req.user.id;
      // Verifica que el restaurant_id pertenezca al usuario (puedes añadir esta lógica)
      const menuId = await Menu.create(restaurant_id, name, price, description, available);
      res.status(201).json({ message: 'Menú creado', id: menuId });
    } catch (err) {
      throw err;
    }
  }

  static async findByRestaurantId(req, res) {
    const { restaurant_id } = req.params;
    if (!restaurant_id || typeof restaurant_id !== 'number') {
      return res.status(400).json({ message: 'El restaurant_id es requerido y debe ser un número' });
    }
    try {
      const menus = await Menu.findByRestaurantId(restaurant_id);
      if (menus.length === 0) {
        return res.status(404).json({ message: 'No se encontraron menús para este restaurante' });
      }
      res.status(200).json(menus);
    } catch (err) {
      throw err;
    }
  }

  static async update(req, res) {
    const { name, price, description, available } = req.body;

    if (!name || typeof name !== 'string' || name.length < 3 || name.length > 100) {
      return res.status(400).json({ message: 'El nombre debe tener entre 3 y 100 caracteres' });
    }
    if (!price || typeof price !== 'number' || price < 0) {
      return res.status(400).json({ message: 'El precio debe ser un número mayor o igual a 0' });
    }
    if (description && typeof description !== 'string' && description.length > 500) {
      return res.status(400).json({ message: 'La descripción no puede superar los 500 caracteres' });
    }
    if (available === undefined || typeof available !== 'boolean') {
      return res.status(400).json({ message: 'El campo available es requerido y debe ser booleano' });
    }

    try {
      const updated = await Menu.update(req.params.id, name, price, description, available);
      if (updated === 0) return res.status(404).json({ message: 'Menú no encontrado' });
      res.status(200).json({ message: 'Menú actualizado' });
    } catch (err) {
      throw err;
    }
  }

  static async delete(req, res) {
    try {
      const deleted = await Menu.delete(req.params.id);
      if (deleted === 0) return res.status(404).json({ message: 'Menú no encontrado' });
      res.status(200).json({ message: 'Menú eliminado' });
    } catch (err) {
      throw err;
    }
  }
}

module.exports = MenuController;