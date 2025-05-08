const express = require('express');
const router = express.Router();
const MenuController = require('../controllers/menuController');
const authenticateToken = require('../middleware/auth');

router.post('/', authenticateToken, MenuController.create);
router.get('/:restaurant_id', authenticateToken, MenuController.findByRestaurantId);
router.put('/:id', authenticateToken, MenuController.update);
router.delete('/:id', authenticateToken, MenuController.delete);

module.exports = router;