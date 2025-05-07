const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class UserController {
  static async register(req, res) {
    const { username, password } = req.body;
    try {
      const userId = await User.create(username, password);
      res.status(201).json({ message: 'Usuario registrado', id: userId });
    } catch (err) {
      res.status(500).json({ err: 'Error al registrar usuario', fatal: true });
    }
  }

  static async login(req, res) {
    const { username, password } = req.body;
    try {
      const user = await User.findByUsername(username);
      if (!user) return res.status(401).json({ message: 'Usuario no encontrado' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ message: 'Contraseña incorrecta' });

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'your_secret_key', { expiresIn: '1h' });
      res.status(200).json({ token });
    } catch (err) {
      res.status(500).json({ err: 'Error al iniciar sesión', fatal: true });
    }
  }
}

module.exports = UserController;