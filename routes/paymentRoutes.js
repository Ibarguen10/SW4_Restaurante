const express = require('express');
const router = express.Router();
const mercadopago = require('../config/mercadopago');

router.post('/create_preference', async (req, res) => {
  const { title, quantity, unit_price } = req.body;

  try {
    const preference = {
      items: [
        {
          title,
          quantity: Number(quantity),
          unit_price: Number(unit_price),
          currency_id: 'COP',
        }
      ],
      back_urls: {
        success: 'http://localhost:3000/pago-exitoso',
        failure: 'http://localhost:3000/pago-fallido',
        pending: 'http://localhost:3000/pago-pendiente',
      },
      auto_return: 'approved'
    };

    const response = await mercadopago.preferences.create(preference);
    res.status(200).json({ id: response.body.id });
  } catch (err) {
    console.error('Error al crear preferencia:', err);
    res.status(500).json({ message: 'Error al crear preferencia', error: err.message });
  }
});

module.exports = router;
