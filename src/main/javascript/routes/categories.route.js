const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

/* defines home rout for displaying categories list */
router.get('/', (req, res) => {
  const jsonPath= path.join(process.cwd(),'src','main','json','food_categories.data.json');
  fs.readFile(jsonPath,'utf-8', (err, data) => {
    const rootUrl = `${req.protocol}://${req.get('Host')}`;
    if (err) { 
      res.status(500).json({ error : 'no categories list' }); 
    }
    res.set('Content-Type','application/json');
    res.status(200).json(
      JSON.parse(data).map(
        (row,pos) => Object.assign({ id: pos+1},row, {picture: `${rootUrl}${row['picture']}` }))
    );
  });
});

module.exports = router;
