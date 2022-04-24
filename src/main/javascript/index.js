/* main js file here. */
const express = require("express");
const path = require("path");

const PORT = 1234;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended:false }));
app.use('/assets',express.static(path.join(process.cwd(),'src','main','assets')));
app.use(express.static(path.join(process.cwd(),'src','main','assets','favicons')));

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});

