const express = require('express');
const multer = require("multer");
const path = require("path");
const {nanoid} = require("nanoid");
const fs = require('fs');

const Pich = require('../models/Pich');
const config = require('../../../../config');
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

    try {
      const piches = await Pich.find().populate('locationId');
      res.send(piches);
    } catch (error) {
      res.status(500).send(error);
    }

  });

  router.get('/last', async (req, res) => {

    // TODO Now we get last four accommodations for glamping,
    //  if its functionality already done so we need to get rid off this router

    try {
      const lastFourPiches = await Pich.find().sort({_id: -1}).limit(4);
      res.send(lastFourPiches);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  router.get('/:id', async (req, res) => {
    try {
      const pich = await Pich.findById(req.params.id)
        .populate('locationId');

      if (!pich) return res.sendStatus(404);

      res.send(pich);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  router.post('/', [upload.array('image'), auth], async (req, res) => {

    try {
      const reqBody = {...req.body};
      if (req.files) reqBody.image = req.files.map(file => file.filename);

      const pich = new Pich(reqBody);

      await pich.save();

      res.send({message: 'Pich was successfully created'});

    } catch (error) {

      req.files.forEach(file => {
        const pathAndFileName = config.uploadPath + '/' + file.filename;
        fs.unlinkSync(pathAndFileName);
      });

      res.status(400).send(error);
    }
  });

  router.put('/:id', [upload.array('image'), auth], async (req, res) => {

    try {

      const pich = await Pich.findById(req.params.id)
        .populate({path: 'locationId', populate: {path: 'owner'}});

      const isOwnerOfPich = req.user._id.toString() === pich.locationId.owner._id.toString();

      if (isOwnerOfPich) {

        const newPich = {...req.body};
        if (req.files) newPich.image = req.files.map(file => file.filename);

        await Pich.findByIdAndUpdate(req.params.id, newPich);

        const updatedPich = await Pich.findById(req.params.id);
        res.send(updatedPich);

      } else {
        return res.status(403).send({message: "This pich do not belong to you"})
      }

    } catch (error) {
      res.status(500).send(error);
    }
  });

  router.delete('/:id', auth, async (req, res) => {
    try {

      const pich = await Pich.findById(req.params.id)
        .populate({path: 'locationId', populate: {path: 'owner'}});

      const isOwnerOfPich = req.user._id.toString() === pich.locationId.owner._id.toString();

      if (isOwnerOfPich) {
        await Pich.findByIdAndDelete(pich._id);
        return res.send({message: "Pich was successfully deleted"});
      } else {
        return res.status(403).send({message: "This pich do not belong to you"})
      }
    } catch (error) {
      res.status(500).send(error);
    }
  });

  return router;
};

module.exports = createRouter;