const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const jsonPath = path.join(process.cwd(), 'src', 'main', 'json', 'food_categories.data.json');

/* defines home rout for displaying categories list */
router.get('/', (req, res) => {
  fs.readFile(jsonPath, 'utf-8', (err, data) => {
    const rootUrl = `${req.protocol}://${req.get('Host')}`;
    if (err) {
      res.status(500).json({
        error: 'no categories list'
      });
    }
    res.status(200).json({
      results: JSON.parse(data).map(
        (row, pos) => Object.assign({
          id: pos + 1
        }, row, {
          picture: `${rootUrl}${row['picture']}`
        }))
    });
  });
});

router.get('/:category_id', (req, res) => {
  fs.readFile(jsonPath, 'utf-8', (err, data) => {
    const rootUrl = `${req.protocol}://${req.get('Host')}`;
    if (err) {
      res.status(500).json({
        error: 'no categories to search'
      });
    }
    const singleCategory = JSON.parse(data).map(
      (row, pos) => Object.assign({
        id: pos + 1
      }, row, {
        picture: `${rootUrl}${row['picture']}`
      })
    ).find(
      itm => itm.id === Number(req.params.category_id)
    );
    if (!singleCategory) {
      res.status(500).json({
        error: 'searched category does not exist'
      });
    } else {
      res.status(200).json({
        result: singleCategory
      });
    }
  });
});

module.exports = router;

