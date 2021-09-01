const { filterArray, sortArrayAsc, sortArrayDesc } = require('../../../utils');

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {nanoid} = require('nanoid');
const config = require('../../../../config');
const auth = require('../middleware/auth');
const Application = require('../models/Application');

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

  router.post('/', auth, upload.array('image'), async (req, res) => {
    const application = new Application(req.body);
    if (req.files) {
      applications.image = req.files.map(file => file.filename);
    }
    try {
      await applications.save();
      res.send(application);
    } catch (error) {
      res.status(400).send(error);
    }
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
