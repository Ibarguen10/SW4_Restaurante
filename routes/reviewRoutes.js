const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const authenticateToken = require('../middleware/auth');

router.get('/:restaurantId', reviewController.findByRestaurantId);
router.post('/', authenticateToken, reviewController.create);
router.put('/:id', authenticateToken, reviewController.updateReview);
router.delete('/:id', authenticateToken, reviewController.deleteReview);

module.exports = router;
