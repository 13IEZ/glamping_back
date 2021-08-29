const express = require('express');
const Reservation = require("../models/Reservation");
const auth = require("../middleware/auth");

const router = express.Router();

const createRouter = () => {

  router.get('/', async (req, res) => {

    try {
      if (req.query.accommodation) {
        const reservations = await Reservation.find({accommodation: req.query.accommodation});
        if (!reservations) return res.sendStatus(404);
        return res.send(reservations);
      } else
      if (req.query.pich) {
        const reservations = await Reservation.find({pich: req.query.pich});
        if (!reservations) return res.sendStatus(404);
        return res.send(reservations);
      } else
      if (req.query.user) {
      const reservations = await Reservation.find({user: req.query.user})
        .populate(['accommodation', 'pich', 'user']);

        if (!reservations) return res.sendStatus(404);

        return res.send(reservations);
      } else if (req.query.owner) {
        await Reservation.find()
          .populate({path: 'pich', 
          populate: {path: 'locationId',
          populate: {path: 'owner'}}}).exec((err, reservations) => {

            if (err) return res.status(500).send(err);

            const reservationsOfUser = [];

            reservations.forEach(reservation => {
              if (reservation.pich) {
                if (reservation.pich.locationId.owner._id.toString() === req.query.owner) {
                  reservationsOfUser.push(reservation);
                }                
              }
            })
            return res.send(reservationsOfUser);
          });
          return;
      }

      const reservations = await Reservation.find()
        .populate(['accommodation', 'pich', 'user']);
      res.send(reservations);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  router.post("/", auth, async (req, res) => {
    try {
      req.body.user=req.user._id;
      const reservation = new Reservation(req.body);
      try {
        await reservation.save();
      } catch (error) {
        return res.status(500).send(error);
      }
      res.send({message: 'Reservation was successfully created'});
    } catch (error) {
      res.status(400).send(error);
    }
  });

  router.get('/:id', async (req, res) => {
    try {
      const reservation = await Reservation.findById(req.params.id)
        .populate(['accommodation', 'pich', 'user']);

      if (!reservation) return res.sendStatus(404);

      res.send(reservation);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  router.get('/:id', async (req, res) => {
    try {
      const reservation = await Reservation.findById(req.params.id)
        .populate(['pich', 'user']);

      if (!reservation) return res.sendStatus(404);

      res.send(reservation);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  router.put('/:id', auth, async (req, res) => {
    try {
      const reservation = await Reservation.findById(req.params.id)
        .populate(['accommodation', 'pich', 'user']);

      const isOwnerOfReservation = req.user._id.toString() === reservation.user._id.toString();

      if (isOwnerOfReservation) {

        const newReservation = {
          ...reservation,
          startDate: req.body.startDate,
          endDate: req.body.endDate
        };

        await Reservation.findByIdAndUpdate(req.params.id, newReservation);

        const updatedReservation = await Reservation.findById(req.params.id);
        res.send(updatedReservation);

      } else {
        return res.status(403).send({message: "This reservation do not belong to you"})
      }

    } catch (error) {
      res.status(500).send(error);
    }
  });

  router.delete('/:id', auth, async (req, res) => {
    try {

      const reservation = await Reservation.findById(req.params.id)
        .populate(['accommodation', 'pich', 'user']);

      const isOwnerOfReservation = req.user._id.toString() === reservation.user._id.toString();

      if (isOwnerOfReservation) {
        await Reservation.findByIdAndDelete(reservation._id);
        return res.send({message: "Reservation was successfully deleted"});
      } else {
        return res.status(403).send({message: "This reservation do not belong to you"})
      }
    } catch (error) {
      res.status(500).send(error);
    }
  });

  return router;
};

module.exports = createRouter;