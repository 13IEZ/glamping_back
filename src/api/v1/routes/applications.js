const { filterArray, sortArrayAsc, sortArrayDesc } = require('../../../utils');

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {nanoid} = require('nanoid');
const config = require('../../../../config');
const auth = require('../middleware/auth');
const Application = require('../models/Application');
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
  router.get('/', async (req, res) => {
    try {
      await Application.find().
      populate({
        path: "pichId", populate: { path: "locationId" }
      }).exec((err, applications) => {
        applications = applications.filter(application => {
          return application.pichId.locationId.equals(req.query.locationId);
        });
        if (applications) {
          res.send(applications);
        } else {
          res.sendStatus(404);
        }
        })
      }catch(error) {
    res.status(500).send(error)
    }
  });

  router.get('/:id', async (req, res) => {
    let application;
    try {
      application = await Application.findById(req.params.id)
      .populate({path: 'productId', 
       populate: {path: 'categoryId'}})
      .populate({
        path: "pichId", populate: { path: "locationId" }
    });

      const sumRating = reviews.reduce(function(a, b) {return a+b.rating}, 0);
      const average = Math.round(sumRating/quantity);
      application.rating = average;
      application.reviewsQuantity = quantity;
      res.send(application);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  });

  router.post('/', auth, upload.array('files'), async (req, res) => {
    try {
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

      reqBody.userId = req.user;
      reqBody.startDate = req.body.reservation.startDate;
      reqBody.endDate = req.body.reservation.endDate;

      const application = new Application(reqBody);
    
      await application.save();
      return res.send(application);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
    res.send(application);
  });

  router.put('/:id', auth, upload.array('image'), async (req, res) => {
    try {
      const application = {...req.body};
      if (req.files) {
        application.image = req.files.map(file => file.filename);
      }
      await Application.updateOne(
        {_id: req.params.id},
        {
          $set: {
            title: application.title,
            description: application.description,
            productId: application.productId,
            pichId: application.pichId,
            image: application.image,
            startDate: application.startDate,
            endDate: application.endDate,
            rent: application.rent,
            status: application.status,
            userId: application.userId,
            preview: application.preview
          },
        }
      );
      const updatedApplication = await Application.findById(req.params.id);
      res.send(updatedApplication);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  router.put('/published/:id', async (req, res) => {
    try {
      const application = await Application.findById(req.params.id);
      if (application) {
        await Application.updateOne({_id: req.params.id}, {$set: {published: !application.published}});
        const updatedApplication = await Application.findById(req.params.id);
        res.send(updatedApplication);
      }
    } catch (error) {
      res.status(400).send(error);
    }
  });

  router.delete('/:id', auth, async (req, res) => {
    try {
      const deletedApplication = await Application.deleteOne({_id: req.params.id});
      res.send(deletedApplication);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  return router;
};

module.exports = createRouter;
