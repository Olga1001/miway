// server/routes/itemRoutes.js
const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// GET всі елементи
router.get('/', async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

// POST новий елемент
router.post('/', async (req, res) => {
  const newItem = new Item({ name: req.body.name });
  const savedItem = await newItem.save();
  res.json(savedItem);
});

module.exports = router;
