const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");

const rootUrl = (req) => `${req.protocol}://${req.get("Host")}`;

const findFoodDetailPath = (foodId) =>
  path.join(
    process.cwd(),
    "src",
    "main",
    "json",
    "food_details",
    `food_${foodId}.data.json`
  );

/* Defines home route for displaying food item by food id */
router.get("/:food_id", (req, res) => {
  fs.readFile(findFoodDetailPath(req.params.food_id), "utf-8", (err, data) => {
    if (err) {
      res.status(500).json({
        error: "No food data found.",
      });
      return;
    }
    try {
      const foodItem = JSON.parse(data);
      res.status(200).json({
        result: Object.assign(foodItem, {
          picture: `${rootUrl(req)}/assets/images/foods/${foodItem.id}.webp`,
        }),
      });
    } catch (jsonErr) {
      res.status(500).json({
        error: "No food data found.",
      });
    }
  });
});

module.exports = router;
