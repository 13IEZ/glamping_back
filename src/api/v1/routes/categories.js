const express = require('express');
const Category = require("../models/Category");

const router = express.Router();

const createRouter = () => {
  router.get('/', async (req, res) => {
    try {
      const categories = await Category.find();
      res.send(categories);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  return router;
};

module.exports = createRouter;