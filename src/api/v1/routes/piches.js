const express = require('express');
const Pich = require('../models/Pich');

const router = express.Router();

const createRouter = () => {

  router.get('/last', async (req, res) => {
    try {
      const lastFourPiches = await Pich.find().sort({_id: -1}).limit(4);
      res.send(lastFourPiches);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  return router;
};

module.exports = createRouter;