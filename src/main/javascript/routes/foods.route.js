const express = require('express');
const router = express.Router();

const categoriesRoute = require('./categories.route');
const foodsRoute = require('./foods.route');

/* Defines home route for displaying food item by id */
router.get('/:food_id', (req, res) => {
  res.status(200).json({
    result: {
      id: Number(req.params.food_id)
    }
  });
});

module.exports = router;

