const express = require("express");
const router = express.Router();

const categoriesRoute = require("./categories.route");
const foodsRoute = require("./foods.route");

/* Uses 'api/categories' route */
router.use("/categories", categoriesRoute);
/* Uses 'api/categories' route */
router.use("/foods", foodsRoute);

module.exports = router;
