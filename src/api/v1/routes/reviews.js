const express = require('express');
const auth = require('../middleware/auth');
const Review = require('../models/Review');

const router = express.Router();

const createRouter = () => {

  router.get("/", async (req, res) => {

    try{
        if(req.query) {
          const reviews = await Review.find(req.query).populate('user');
          return res.send(reviews);  
        }

        const reviews = await Review.find();
        res.send(reviews);
    } catch(e) {
        res.sendStatus(500);
    }
  });

  router.post("/", auth, async (req, res) => {
    if(!req.body.module && !req.body.location || req.body.module && req.body.location)
    return res.send("Error")
    
    try {
      const reqBody = {...req.body};
      reqBody.user = req.user;
      const review = new Review(reqBody);
        try {
          await review.save();
        }
        catch (error) {
          return res.status(500).send(error);
        }
        res.send(review);
    } catch (error) {
        res.status(400).send(error);
      }
  });
  
  router.delete('/:id', auth, async (req, res) => {
    try {
      await Review.deleteOne({ _id: req.params.id });
      res.send({message: 'Review was deleted successfully'});
    } catch (error) {
      res.status(500).send(error);
    }
  });

  router.put('/:id', auth, async (req, res) => {
    try {
      const newReview = {...req.body};
      const updatedReview = await Review.findById(req.params.id);
      if (updatedReview) {
        await Review.findByIdAndUpdate(req.params.id, newReview);
        res.send(updatedReview);
      }
    } catch (error) {
      res.status(400).send(error);
    }
  });

  return router;
};


module.exports = createRouter;