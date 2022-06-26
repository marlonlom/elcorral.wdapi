/* main js file here. */
const express = require("express");
const path = require("path");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended:false }));
app.use('/assets',express.static(path.join(process.cwd(),'src','main','assets')));
app.use(express.static(path.join(process.cwd(),'src','main','assets','favicons')));

app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/', (req, res) => {
  res.send("Hello world");
});

app.use('/api', require('./routes/api.route'));

/* handle the overall error generated within code */
app.use((error, req, res) => {
  if (error) {
    res.status(error.status || 500).json({
      error: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});

