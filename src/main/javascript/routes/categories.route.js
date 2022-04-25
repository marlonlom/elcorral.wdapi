const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const jsonPath = path.join(process.cwd(), 'src', 'main', 'json', 'food_categories.data.json');
const foodGroupsPath = path.join(process.cwd(), 'src', 'main', 'json', 'foods_grouped_by_category.data.json');
const rootUrl = (req) => `${req.protocol}://${req.get('Host')}`;

/* defines home route for displaying categories list */
router.get('/', (req, res) => {
  fs.readFile(jsonPath, 'utf-8', (err, data) => {
    if (err) {
      res.status(500).json({
        error: 'No categories found.'
      });
    }
    res.status(200).json({
      results: JSON.parse(data).map(
        (row, pos) => Object.assign({
          id: pos + 1
        }, row, {
          picture: `${rootUrl(req)}${row.picture}`
        }))
    });
  });
});

router.get('/:category_id', (req, res) => {
  fs.readFile(jsonPath, 'utf-8', (err, data) => {
    if (err) {
      res.status(500).json({
        error: 'No categories to search.'
      });
    }
    const singleCategory = JSON.parse(data).map(
      (row, pos) => Object.assign({
        id: pos + 1
      }, row, {
        picture: `${rootUrl(req)}${row.picture}`
      })
    ).find(
      itm => itm.id === Number(req.params.category_id)
    );
    if (!singleCategory) {
      res.status(500).json({
        error: 'Searched category does not exist.'
      });
    } else {
      res.status(200).json({
        result: singleCategory
      });
    }
  });
});

router.get('/:category_id/foods', (req, res) => {
  fs.readFile(jsonPath, 'utf-8', (err, data) => {
    if (err) {
      res.status(500).json({
        error: 'No categories to search.'
      });
    }
    const singleCategory = JSON.parse(data).map(
      (row, pos) => Object.assign({
        id: pos + 1
      }, row, {
        picture: `${rootUrl(req)}${row.picture}`
      })
    ).find(
      itm => itm.id === Number(req.params.category_id)
    );
    if (!singleCategory) {
      res.status(500).json({
        error: 'Searched category does not exist.'
      });
    } else {
      fs.readFile(foodGroupsPath, 'utf-8', (err2, fg_data) => {
        if (err2) {
          res.status(500).json({
            error: 'No foods found.'
          });
        }
        const foodsList = JSON.parse(fg_data);
        res.status(200).json({
          results: singleCategory.code.split(';')
            .map(code => foodsList[code])
            .reduce((acc, curr) => {
              acc = acc.concat(curr);
              return acc;
            }, [])
            .map(food => Object.assign({}, {
              id: Number(food.id),
              title: food.title,
              priceText: food.priceText,
              picture: `${rootUrl(req)}/assets/images/foods/${food.id}.webp`
            }))
        });
      });
    }
  });
});

module.exports = router;

