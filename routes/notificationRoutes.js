const express = require('express');
const router = express.Router();
const NotificationController = require('../controllers/notificationController');
const authenticateToken = require('../middleware/auth');

router.post('/', authenticateToken, NotificationController.create);
router.get('/', authenticateToken, NotificationController.getNotifications);

module.exports = router;