const express = require('express');
const {nanoid} = require('nanoid');
const multer = require('multer');
const path = require('path');

const config = require('../../../../config');
const Location = require('../models/Location');
const auth = require("../middleware/auth");
const fs = require('fs');

const MAGIC_NUMBERS = {
  jpg: 'ffd8ffe0',
  jpg1: 'ffd8ffe1',
  png: '89504e47',
  gif: '47494638'
}

const checkMagicNumbers = (magic) => {
  if (
        magic === MAGIC_NUMBERS.jpg ||
        magic === MAGIC_NUMBERS.jpg1 || 
        magic === MAGIC_NUMBERS.png || 
        magic === MAGIC_NUMBERS.gif
  ) 
    return true
}

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  limits: {
    files: 5,
    fieldSize: 2 * 1024 * 1024
  }
});


const createRouter = () => {

  router.get('/', async (req, res) => {

    try {
      const locations = await Location.find().populate('owner');
      res.send(locations);
    
    } catch(error) {
      res.status(500).send(error);
    }

  });

  router.get('/pages', (req, res) => {
    let page = parseInt(req.query.page) || 0;
    let limit = parseInt(req.query.limit) || 12;
    Location.find()
      .sort({ _id: +1 })
      .skip(page * limit)
      .limit(limit)
      .exec((err, doc) => {
        if (err) {
          return res.send(err);
        }
        Location.estimatedDocumentCount().exec((count_error, count) => {
          if (err) {
            return res.send(count_error);
          }
          return res.send({
            items: count,
            pages: Math.ceil(count / limit),
            page: page,
            pageSize: doc.length,
            locations: doc,
          });
        });
      });
  });

  router.get('/last', async (req, res) => {
    try {
      const lastFourLocations = await Location.find()
        .sort({_id: -1}).limit(4).populate('owner');

      res.send(lastFourLocations);
    } catch (error) {
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

  router.post('/', auth, upload.array('files'), async (req, res) => {
    try {
      req.body.coords = JSON.parse(req.body.coords)

      const reqBody = {...req.body};
      reqBody.image = req.files.map(file => file.filename);
      const bitmap = fs.readFileSync(config.uploadPath + '/' + reqBody.image).toString('hex', 0, 4);
      if (!checkMagicNumbers(bitmap)) {
        fs.unlinkSync(config.uploadPath + '/' + reqBody.image);
        const error = 'File is not a valid';
        return res.status(400).send({error: error});
      } else {
        res.send('File is uploaded');
      }

      reqBody.owner = req.user;
      
      const location = new Location(reqBody);
      try {
        await location.save();
       res.send(location);
      } catch (error) {
        console.log(error)
        // !!! TODO Delete image if error occurred
        return res.status(500).send(error);
      }
    } catch (error) {
      console.log(error)
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