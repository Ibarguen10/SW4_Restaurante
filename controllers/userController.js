const User = require('../models/user');

class UserController {
  static async register(req, res) {
    const { username, password } = req.body;

    if (!username || typeof username !== 'string' || username.length < 3 || username.length > 30) {
      return res.status(400).json({ message: 'El username debe tener entre 3 y 30 caracteres' });
    }
    if (!password || typeof password !== 'string' || password.length < 6) {
      return res.status(400).json({ message: 'La contraseña debe tener al menos 6 caracteres' });
    }

    try {
      const userId = await User.create(username, password);
      res.status(201).json({ message: 'Usuario registrado', id: userId });
    } catch (err) {
      throw err;
    }
  }

  static async login(req, res) {
    const { username, password } = req.body;

    if (!username || typeof username !== 'string') {
      return res.status(400).json({ message: 'El username es requerido' });
    }
    if (!password || typeof password !== 'string') {
      return res.status(400).json({ message: 'La contraseña es requerida' });
    }

    try {
      const user = await User.findByUsername(username);
      if (!user) return res.status(401).json({ message: 'Usuario no encontrado' });

      const isMatch = await User.comparePassword(password, user.password); // Asegúrate de que este método esté en User.js
      if (!isMatch) return res.status(401).json({ message: 'Contraseña incorrecta' });

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'your_secret_key', { expiresIn: '1h' });
      res.status(200).json({ token });
    } catch (err) {
      throw err;
    }
  }

  static async getProfile(req, res) {
    try {
      const user = await User.findById(req.user.id);
      if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
      res.status(200).json({ id: user.id, username: user.username });
    } catch (err) {
      throw err;
    }
  }
}

module.exports = UserController;