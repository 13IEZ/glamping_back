const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { nanoid } = require('nanoid');
const config = require('../../../../config');
const Accommodation = require('../models/Accommodation');
const Review = require('../models/Review');
const auth = require('../middleware/auth');
const filterAccomod = require('../middleware/filterAccomod');
const AccommodationFilter = require('../models/AccommodationFilter');
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

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname));
  },
});

const upload = multer({ 
  storage,
  limits: {
    files: 5,
    fieldSize: 2 * 1024 * 1024
  }
});

const createRouter = () => {
  router.get('/filters', filterAccomod, async (req, res) => {
    let page = 0;
    let limit = 12;
    AccommodationFilter.find()
      .skip(page * limit)
      .limit(limit)
      .exec((err, doc) => {
        if (err) {
          return res.send(err);
        }
        AccommodationFilter.estimatedDocumentCount().exec((count_error, count) => {
          if (err) {
            return res.send(count_error);
          }
          return res.send({
            items: count,
            pages: Math.ceil(count / limit),
            page: page,
            pageSize: doc.length,
            allAccommodations: doc,
          });
        });
      });
  });

  router.get('/pages', filterAccomod, (req, res) => {
    let page = parseInt(req.query.page) || 0;
    let limit = parseInt(req.query.limit) || 2;
    AccommodationFilter.find()
      .skip(page * limit)
      .limit(limit)
      .exec((err, doc) => {
        if (err) {
          return res.send(err);
        }
        AccommodationFilter.estimatedDocumentCount().exec((count_error, count) => {
          if (err) {
            return res.send(count_error);
          }
          return res.send({
            items: count,
            pages: Math.ceil(count / limit),
            page: page,
            pageSize: doc.length,
            allAccommodations: doc,
          });
        });
      });
  });

  router.get('/last', async (req, res) => {
    try {
      const lastFourAccommodations = await Accommodation.find()
      .populate({
        path: 'pichId',
        populate: ({path: 'locationId', select: 'region'}), 
      });
      res.send(lastFourAccommodations);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  //get all accommodations related to current location
  router.get('/', async (req, res) => {
    try {
      await Accommodation.find()
        .populate({
          path: 'pichId',
          populate: { path: 'locationId' },
        })
        .exec((err, accommodations) => {
          accommodations = accommodations.filter(accommodation => {
            return accommodation.pichId.locationId.equals(req.query.locationId);
          });
          if (accommodations) {
            res.send(accommodations);
          } else {
            res.sendStatus(404);
          }
        });
    } catch (error) {
      res.status(500).send(error);
    }
  });

  router.get('/:id', async (req, res) => {
    let accommodation;
    try {
      accommodation = await Accommodation.findById(req.params.id)
        .populate({ path: 'productId', populate: { path: 'categoryId' } })
        .populate({
          path: 'pichId',
          populate: { path: 'locationId' },
        });

      const reviews = await Review.find({ accommodation: req.params.id });
      const quantity = reviews.length;
      const sumRating = reviews.reduce(function (a, b) {
        return a + b.rating;
      }, 0);
      const average = Math.round(sumRating / quantity);
      accommodation.rating = average;
      accommodation.reviewsQuantity = quantity;
      res.send(accommodation);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  });

  router.post('/', auth, upload.array('image'), async (req, res) => {
    try {
      const accommodation = new Accommodation(req.body);
    
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

    
      await accommodations.save();
      res.send(accommodation);
    } catch (error) {
      res.status(400).send(error);
    }
  });

  router.put('/:id', auth, upload.array('image'), async (req, res) => {
    try {
      const accommodation = { ...req.body };
      if (req.files) {
        accommodation.image = req.files.map(file => file.filename);
      }
      await Accommodation.updateOne(
        { _id: req.params.id },
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
            preview: accommodation.preview,
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
        await Accommodation.updateOne({ _id: req.params.id }, { $set: { published: !accommodation.published } });
        const updatedAccommodation = await Accommodation.findById(req.params.id);
        res.send(updatedAccommodation);
      }
    } catch (error) {
      res.status(400).send(error);
    }
  });

  router.delete('/:id', auth, async (req, res) => {
    try {
      const deletedAccommodation = await Accommodation.deleteOne({ _id: req.params.id });
      res.send(deletedAccommodation);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  return router;
};

module.exports = createRouter;
