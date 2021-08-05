const express = require('express');
const Factory = require('../models/Factory');

const router = express.Router();

const createRouter = () => {
  router.get('/', async (req, res) => {
    try {
      const factories = await Factory.find();
      res.send(factories);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  return router;
};

module.exports = createRouter;
