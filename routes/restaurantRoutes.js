const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');
const authenticateToken = require('../middleware/auth');

router.get('/', restaurantController.getRestaurants);
router.get('/:id', restaurantController.getRestaurantById);
router.post('/', authenticateToken, restaurantController.createRestaurant);
router.put('/:id', authenticateToken, restaurantController.updateRestaurant);
router.delete('/:id', authenticateToken, restaurantController.deleteRestaurant);
router.get('/filter', restaurantController.filterRestaurants);

module.exports = router;