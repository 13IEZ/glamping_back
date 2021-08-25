const express = require('express');
const auth = require('../middleware/auth');
const {countDocuments} = require('../models/Review');
const Review = require('../models/Review');

const router = express.Router();

const createRouter = () => {

  router.get("/", async (req, res) => {

    try {
      if (req.query.product) {
        const reviews = await Review.find(req.query).populate('user', 'username');
        return res.send(reviews);
      } else if (req.query.accommodation) {
        const reviews = await Review.find(req.query).populate('user', 'username');
        return res.send(reviews);
      } else if (req.query.user) {
        const reviews = await Review.find(req.query).populate('user', 'username')
        .populate('accommodation', 'title');
        return res.send(reviews);
      }

      const reviews = await Review.find().populate('user', 'username');
      res.send(reviews);
    } catch (e) {
      res.sendStatus(500);
    }
  });

  router.get('/pages', (req, res) => {
    let page = parseInt(req.query.page) || 0;
    let limit = parseInt(req.query.limit) || 2;
      if(req.query.product) {
        let productId = req.query.product;
        Review.find({product: productId})
        .populate('user')
        .sort({_id: -1})
        .skip(page * limit)
        .limit(limit)
        .exec((err, doc) => {
          if (err) {
            return res.send(err);
          }
          Review.estimatedDocumentCount().exec((count_error) => {
            if (err) {
              return res.send(count_error);
            }
            return res.send({
              items: doc.length * limit,
              pages: Math.ceil(doc.length),
              page: page,
              reviews: doc,
            });
          });
        });
    } else
    if(req.query.accommodation) {
      let accommodationId = req.query.accommodation;
      Review.find({accommodation: accommodationId})
        .populate('user')
        .sort({_id: -1})
        .skip(page * limit)
        .limit(limit)
        .exec((err, doc) => {
          if (err) {
            return res.send(err);
          }
          Review.estimatedDocumentCount().exec((count_error) => {
            if (err) {
              return res.send(count_error);
            }
            return res.send({
              items: doc.length * limit,
              accommodationReviewPages: Math.ceil(doc.length),
              page: page,
              accommodationReviews: doc,
            });
          });
        });
    }
  });

  router.post("/", auth, async (req, res) => {

    if (!req.body.product && !req.body.location || req.body.product && req.body.location) {
      return res.send("Error")
    }

    const reqBody = {...req.body, date: Date.now(), user: req.user._id};

    try {
      const review = new Review(reqBody);
      try {
        await review.save();
      } catch (error) {
        return res.status(500).send(error);
      }
      res.send({message: 'Review was successfully created'});
    } catch (error) {
      res.status(400).send(error);
    }
  });

  router.delete('/:id', auth, async (req, res) => {
    try {
      await Review.deleteOne({_id: req.params.id});
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