const express = require('express');
const app = express();
const PORT = 8080;

app.set('view engine', 'ejs');
var path = require('path');
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(PORT, () => {
  console.log(`2D Game is listening on port ${PORT}.`);
});