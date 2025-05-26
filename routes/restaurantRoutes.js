const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');
const authenticateToken = require('../middleware/auth');


router.get('/', restaurantController.findAll); 
router.get('/:id', restaurantController.findById); 
router.post('/', authenticateToken, restaurantController.create); 
router.put('/:id', authenticateToken, restaurantController.update); 
router.delete('/:id', authenticateToken, restaurantController.delete);
router.get('/filter', restaurantController.getRecommendations); 

module.exports = router;