const {sortArrAsc, sortArrDesc} = require('../../../utils');

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {nanoid} = require('nanoid');
const config = require('../../../../config');
const Product = require('../models/Product');
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
    let products;
    try {
      products = await Product.find();
      if (req.query.sort) {
        if (req.query.order === 'asc') {
          res.send(sortArrAsc(products, req.query.sort));
        } else {
          res.send(sortArrDesc(products, req.query.sort));
        }
      } else {
        res.send(products);
      }
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  });

  router.get('/category/:id', async (req, res) => {
    try {
      const products = await Product.find({categoryId: req.params.id});
      res.send(products);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  router.get('/pages', (req, res) => {
    let page = parseInt(req.query.page) || 0;
    let limit = parseInt(req.query.limit) || 3;
    Module.find()
      .sort({_id: -1})
      .skip(page * limit)
      .limit(limit)
      .exec((err, doc) => {
        if (err) {
          return res.send(err);
        }
        Module.estimatedDocumentCount().exec((count_error, count) => {
          if (err) {
            return res.send(count_error);
          }
          return res.send({
            items: count,
            pages: Math.ceil(count / limit),
            page: page,
            pageSize: doc.length,
            modules: doc,
          });
        });
      });
  });

  router.get('/last', async (req, res) => {
    try {
      const lastFourProducts = await Product.find().sort({_id: -1}).limit(4);
      if (req.query.sort) {
        if (req.query.order === 'asc') {
          res.send(sortArrAsc(lastFourProducts, req.query.sort));
        } else {
          res.send(sortArrDesc(lastFourProducts, req.query.sort));
        }
      } else {
        res.send(lastFourProducts);
      }
    } catch (error) {
      res.status(500).send(error);
    }
  });

  router.get('/:id', async (req, res) => {
    let module;
    try {
      module = await Product.findById(req.params.id);
      res.send(module);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  });

  router.post('/', auth, upload.array('image'), async (req, res) => {
    const module = new Product(req.body);
    if (req.files) {
      module.image = req.files.map(file => file.filename);
    }
    try {
      await module.save();
      res.send(module);
    } catch (error) {
      res.status(400).send(error);
    }
  });

  router.put('/:id', auth, upload.array('image'), async (req, res) => {
    try {
      const module = {...req.body};
      if (req.files) {
        module.image = req.files.map(file => file.filename);
      }
      await Product.updateOne(
        {_id: req.params.id},
        {
          $set: {
            title: module.title,
            type: module.type,
            image: module.image,
            roominess: module.roominess,
            year: module.year,
            description: module.description,
            number: module.number,
            series: module.series,
            color: module.color,
            price: module.price,
            rent: module.rent,
            status: module.status,
          },
        }
      );
      const updatedProduct = await Product.findById(req.params.id);
      res.send(updatedProduct);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  router.put('/published/:id', async (req, res) => {
    try {
      const module = await Product.findById(req.params.id);
      if (module) {
        await Product.updateOne({_id: req.params.id}, {$set: {published: !module.published}});
        const updatedProduct = await Product.findById(req.params.id);
        res.send(updatedProduct);
      }
    } catch (error) {
      res.status(400).send(error);
    }
  });

  router.delete('/:id', auth, async (req, res) => {
    try {
      const deletedProduct = await Product.deleteOne({_id: req.params.id});
      res.send(deletedProduct);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  return router;
};

module.exports = createRouter;
