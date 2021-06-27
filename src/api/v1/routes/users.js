const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

const createRouter = () => {
  router.get('/', auth, async (req, res) => {
    try {
      const users = await User.find({});
      res.send(users);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  router.post('/', async (req, res) => {
    try {
      const user = new User(req.body);
      user.generateToken();
      await user.save();
      res.send(user);
    } catch (err) {
      res.status(400).send(err);
    }
  });

  router.post('/sessions', async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });

      const errorMessage = 'Wrong username or password';

      if (!user) return res.status(400).send({ error: errorMessage });

      const isMatch = await user.checkPassword(req.body.password);

      if (!isMatch) return res.status(400).send({ error: errorMessage });

      user.generateToken();
      try {
        await user.save({ validateBeforeSave: false });
      } catch (e) {
        return res.status(500).send(e);
      }
      res.send(user);
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  });

  router.delete('/sessions', async (req, res) => {
    const token = req.get('Authentication');
    const success = { message: 'Success' };

    if (!token) return res.send(success);

    const user = await User.findOne({ token });
    if (!user) return res.send(success);

    user.generateToken();
    try {
      await user.save({ validateBeforeSave: false });
      return res.send(success);
    } catch (e) {
      res.status(500).send(e);
    }
  });

  router.get('/:id', auth, async (req, res) => {
    let user;
    try {
      user = await User.findById(req.params.id);
      res.send(user);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  router.delete('/:id', auth, async (req, res) => {
    try {
      const deletedUser = await User.deleteOne({ _id: req.params.id });
      res.send(deletedUser);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  router.put('/:id', auth, async (req, res) => {
    try {
      const user = { ...req.body };
      await User.updateOne(
        { _id: req.params.id },
        {
          $set: {
            username: user.username,
            phone: user.phone,
            email: user.email,
            role: user.role,
            description: user.description,
          },
        }
      );
      const updatedUser = await User.findById(req.params.id);
      res.send(updatedUser);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  return router;
};

module.exports = createRouter;
