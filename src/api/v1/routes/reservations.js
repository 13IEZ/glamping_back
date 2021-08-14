const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');

const createRouter = () => {

  router.get('/', async (req, res) => {
    try {
      if (req.query.accommodation) {
        const reservations = await Reservation.find({accommodation: req.query.accommodation});
        if (!reservations) return res.sendStatus(404);
        return res.send(reservations);
      }

      const reservations = await Reservation.find();
      res.send(reservations);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  return router;
};

module.exports = createRouter;