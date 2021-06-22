const express = require('express');
const {nanoid} = require('nanoid');
const multer = require('multer');
const path = require('path');

const config = require('../../../../config');
const Location = require('../models/Location');
const auth = require("../middleware/auth");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname));
  }
});

const upload = multer({storage});


const createRouter = () => {

  router.get('/', async (req, res) => {

    // !!! TODO We need to decide about query params in this route

    try {
      const locations = await Location.find().populate('owner');
      res.send(locations);
    } catch(error) {
      res.status(500).send(error);
    }

  });

  router.get("/:id", async (req, res) => {

    try {

      const location = await Location.findById(req.params.id)
        .populate('owner');

      if (!location) return res.sendStatus(404);

      res.send(location);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  router.post('/', auth, upload.array('image'), async (req, res) => {


    try {
      const reqBody = {...req.body};
      if (req.files) reqBody.image = req.files.map(file => file.filename);

      reqBody.owner = req.user;

      const location = new Location(reqBody);

      try {
        await location.save();
      } catch (error) {
        // !!! TODO Delete image if error occurred
        return res.status(500).send(error);
      }

      res.send(location);
    } catch (error) {
      // !!! TODO Delete image if error occurred
      res.status(400).send(error);
    }
  });

  router.put('/:id', upload.array('image'), async (req, res) => {
    try {

      const newLocation = { ...req.body };
      if (req.files) newLocation.image = req.files.map(file => file.filename);

      await Location.findByIdAndUpdate(req.params.id, newLocation);

      const updatedLocation = await Location.findById(req.params.id);
      res.send(updatedLocation);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  router.delete('/:id', async (req, res) => {

    try {
      await Location.findByIdAndRemove(req.params.id);
      res.send({message: 'Location was deleted successfully'});
    } catch (error) {
      res.status(500).send(error);
    }
  });

  return router;
};

module.exports = createRouter;