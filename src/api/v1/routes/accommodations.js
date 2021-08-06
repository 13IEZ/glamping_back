const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {nanoid} = require('nanoid');
const config = require('../../../../config');
const Accommodation = require('../models/Accommodation');
const auth = require('../middleware/auth');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname));
  },
});

const upload = multer({storage});

const createRouter = () => {
  router.get('/', async (req, res) => {
    try {
      if(req.query.location) {
        const accommodations = await Accommodation.find({locationId: req.query.location});
        return res.send(accommodations);  
      }

      const accommodations = await Accommodation.find();
      res.send(accommodations);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  router.get('/:id', async (req, res) => {
    let accommodation;
    try {
      accommodation = await Accommodation.findById(req.params.id)
      .populate({path: 'productId', 
       populate: {path: 'categoryId'}});
      res.send(accommodation);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  });

  router.post('/', auth, upload.array('image'), async (req, res) => {
    const accommodation = new Accommodation(req.body);
    if (req.files) {
      accommodations.image = req.files.map(file => file.filename);
    }
    try {
      await accommodations.save();
      res.send(accommodation);
    } catch (error) {
      res.status(400).send(error);
    }
  });

  router.put('/:id', auth, upload.array('image'), async (req, res) => {
    try {
      const accommodation = {...req.body};
      if (req.files) {
        accommodation.image = req.files.map(file => file.filename);
      }
      await Accommodation.updateOne(
        {_id: req.params.id},
        {
          $set: {
            title: accommodation.title,
            description: accommodation.description,
            productId: accommodation.productId,
            pichId: accommodation.pichId,
            image: accommodation.image,
            startDate: accommodation.startDate,
            endDate: accommodation.endDate,
            rent: accommodation.rent,
            status: accommodation.status,
            userId: accommodation.userId,
            preview: accommodation.preview
          },
        }
      );
      const updatedAccommodation = await Accommodation.findById(req.params.id);
      res.send(updatedAccommodation);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  router.put('/published/:id', async (req, res) => {
    try {
      const accommodation = await Accommodation.findById(req.params.id);
      if (accommodation) {
        await Accommodation.updateOne({_id: req.params.id}, {$set: {published: !accommodation.published}});
        const updatedAccommodation = await Accommodation.findById(req.params.id);
        res.send(updatedAccommodation);
      }
    } catch (error) {
      res.status(400).send(error);
    }
  });

  router.delete('/:id', auth, async (req, res) => {
    try {
      const deletedAccommodation = await Accommodation.deleteOne({_id: req.params.id});
      res.send(deletedAccommodation);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  return router;
};

module.exports = createRouter;