const Notification = require('../models/notification');

class NotificationController {
  static async create(req, res) {
    const { user_id, message, read } = req.body;

    if (!user_id || typeof user_id !== 'number') {
      return res.status(400).json({ message: 'El user_id es requerido y debe ser un número' });
    }
    if (!message || typeof message !== 'string' || message.length > 500) {
      return res.status(400).json({ message: 'El mensaje es requerido y no puede superar los 500 caracteres' });
    }
    const isRead = read !== undefined ? !!read : false;

    try {
      const notificationId = await Notification.create(user_id, message, isRead);
      res.status(201).json({ message: 'Notificación creada', id: notificationId });
    } catch (err) {
      throw err;
    }
  }

  static async getNotifications(req, res) {
    try {
      const notifications = await Notification.findByUserId(req.user.id);
      res.status(200).json(notifications);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = NotificationController;