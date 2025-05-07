const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewcontroller');
const authenticateToken = require('../middleware/auth');

router.get('/:restaurantId', reviewController.getReviews);
router.post('/', authenticateToken, reviewController.createReview);
router.put('/:id', authenticateToken, reviewController.updateReview);
router.delete('/:id', authenticateToken, reviewController.deleteReview);

module.exports = router;