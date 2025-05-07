const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const db = require('./config/db');
const User = require('./models/User');
const Restaurant = require('./models/restaurant');
const Review = require('./models/review');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());

// Middleware para verificar el token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token requerido' });

  jwt.verify(token, process.env.JWT_SECRET || 'your_secret_key', (err, user) => {
    if (err) return res.status(403).json({ message: 'Token inválido' });
    req.user = user;
    next();
  });
};

// Usa las rutas de usuario
app.use('/api/users', userRoutes);

// Rutas para restaurantes
app.post('/api/restaurants', authenticateToken, async (req, res) => {
  const { name, latitude, longitude, cuisine_type } = req.body;
  try {
    const user_id = req.user.id;
    const restaurantId = await Restaurant.create(name, latitude, longitude, cuisine_type, user_id);
    res.status(201).json({ message: 'Restaurante creado', id: restaurantId });
  } catch (err) {
    res.status(500).json({ err: 'Error al crear restaurante', fatal: true });
  }
});

app.get('/api/restaurants', async (req, res) => {
  try {
    const restaurants = await Restaurant.findAll();
    res.status(200).json(restaurants);
  } catch (err) {
    res.status(500).json({ err: 'Error en la consulta', fatal: true });
  }
});

app.get('/api/restaurants/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) return res.status(404).json({ message: 'Restaurante no encontrado' });
    res.status(200).json(restaurant);
  } catch (err) {
    res.status(500).json({ err: 'Error en la consulta', fatal: true });
  }
});

app.put('/api/restaurants/:id', authenticateToken, async (req, res) => {
  const { name, latitude, longitude, cuisine_type } = req.body;
  try {
    const updated = await Restaurant.update(req.params.id, name, latitude, longitude, cuisine_type);
    if (updated === 0) return res.status(404).json({ message: 'Restaurante no encontrado' });
    res.status(200).json({ message: 'Restaurante actualizado' });
  } catch (err) {
    res.status(500).json({ err: 'Error al actualizar restaurante', fatal: true });
  }
});

app.delete('/api/restaurants/:id', authenticateToken, async (req, res) => {
  try {
    const deleted = await Restaurant.delete(req.params.id);
    if (deleted === 0) return res.status(404).json({ message: 'Restaurante no encontrado' });
    res.status(200).json({ message: 'Restaurante eliminado' });
  } catch (err) {
    res.status(500).json({ err: 'Error al eliminar restaurante', fatal: true });
  }
});

// Rutas para reseñas
app.post('/api/reviews', authenticateToken, async (req, res) => {
  const { restaurant_id, rating, comment } = req.body;
  try {
    const user_id = req.user.id;
    const reviewId = await Review.create(restaurant_id, user_id, rating, comment);
    res.status(201).json({ message: 'Reseña creada', id: reviewId });
  } catch (err) {
    res.status(500).json({ err: 'Error al crear reseña', fatal: true });
  }
});

app.get('/api/reviews', async (req, res) => {
  const { restaurant_id } = req.query;
  if (!restaurant_id) {
    return res.status(400).json({ message: 'Se requiere restaurant_id' });
  }
  try {
    const reviews = await Review.findByRestaurantId(restaurant_id);
    if (reviews.length === 0) {
      return res.status(404).json({ message: 'No se encontraron reseñas para este restaurante' });
    }
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ err: 'Error al obtener reseñas', fatal: true });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});