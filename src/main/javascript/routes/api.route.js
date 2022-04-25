const express = require('express');
const router = express.Router();

const categoriesRoute = require('./categories.route');

/* defines 'api/categories' route */
router.use('/categories', categoriesRoute);

module.exports = router;

