const { filterArr, sortArrAsc, sortArrDesc } = require('../../../utils');

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { nanoid } = require('nanoid');
const config = require('../../../../config');
const Product = require('../models/Product');
const ProductFilter = require('../models/ProductFilter');
const Review = require('../models/Review');
const auth = require('../middleware/auth');
const filter = require('../middleware/filter');
const fs = require('fs')

const PRODUCT_PAGE_COUNT = 15;

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

      if (req.query.user) {
        const productsOfUser = await Product.find({userId: req.query.user})
          .populate(['userId', 'categoryId', 'factoryId']);
        return res.send(productsOfUser);
      }


      let products = await Product.find();
      if (req.query.filter) {
        products = filterArr(products, req.query.filter, req.query._id);
      }
      if (req.query.sort) {
        if (req.query.order === 'asc') {
          products = sortArrAsc(products, req.query.sort);
        } else {
          products = sortArrDesc(products, req.query.sort);
        }
      }
      res.send(products);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  });

  router.get('/category/:id', async (req, res) => {
    try {
      const products = await Product.find({ categoryId: req.params.id });
      res.send(products);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  router.get('/filters', filter, async (req, res) => {
    let page = 0;
    let limit = PRODUCT_PAGE_COUNT;
    ProductFilter.find()
      .skip(page * limit)
      .limit(limit)
      .exec((err, doc) => {
        if (err) {
          return res.send(err);
        }
        ProductFilter.estimatedDocumentCount().exec((count_error, count) => {
          if (err) {
            return res.send(count_error);
          }
          return res.send({
            items: count,
            pages: Math.ceil(count / limit),
            page: page,
            pageSize: doc.length,
            products: doc,
          });
        });
      });
  });

  router.get('/pages', filter, (req, res) => {
    let page = parseInt(req.query.page) || 0;
    let limit = parseInt(req.query.limit) || PRODUCT_PAGE_COUNT;
    ProductFilter.find()
      .skip(page * limit)
      .limit(limit)
      .exec((err, doc) => {
        if (err) {
          return res.send(err);
        }
        ProductFilter.estimatedDocumentCount().exec((count_error, count) => {
          if (err) {
            return res.send(count_error);
          }
          return res.send({
            items: count,
            pages: Math.ceil(count / limit),
            page: page,
            pageSize: doc.length,
            products: doc,
          });
        });
      });
  });

  router.get('/last', async (req, res) => {
    try {
      const lastFourProducts = await Product.find().sort({ _id: -1 }).limit(4);
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
    try {
      const product = await Product.findById(req.params.id).populate('factoryId');
      const reviews = await Review.find({ product: req.params.id });
      const quantity = reviews.length;
      const sumRating = reviews.reduce(function (a, b) {
        return a + b.rating;
      }, 0);
      const average = Math.round(sumRating / quantity);
      product.rating = average;
      product.reviewsQuantity = quantity;
      res.send(product);
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

      const product = new Product(reqBody);
    
      await product.save();
      return res.send(product);

    } catch (error) {
      console.log(error);
      return res.status(500).send(error)
    }
  });

  router.put('/:id', auth, upload.array('image'), async (req, res) => {
    try {
      const product = { ...req.body };
      if (req.files) {
        product.image = req.files.map(file => file.filename);
      }
      await Product.updateOne(
        { _id: req.params.id },
        {
          $set: {
            title: product.title,
            categoryId: product.categoryId,
            image: product.image,
            season: product.season,
            factoryId: product.factoryId,
            roominess: product.roominess,
            year: product.year,
            description: product.description,
            price: product.price,
            rent: product.rent,
            status: product.status,
            published: product.published,
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
      const product = await Product.findById(req.params.id);
      if (product) {
        await Product.updateOne({ _id: req.params.id }, { $set: { published: !product.published } });
        const updatedProduct = await Product.findById(req.params.id);
        res.send(updatedProduct);
      }
    } catch (error) {
      res.status(400).send(error);
    }
  });

  router.delete('/:id', auth, async (req, res) => {
    try {
      const deletedProduct = await Product.deleteOne({ _id: req.params.id });
      res.send(deletedProduct);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  return router;
};

module.exports = createRouter;
