const express = require('express');

const app = express();
const PORT = 4000;

app.use(express.static('./src'));

app.listen(PORT, function () {
  console.log(`App listening on port ${PORT}!`);
}); 