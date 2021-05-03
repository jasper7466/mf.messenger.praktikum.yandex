const express = require('express');
const path = require('path');

const app = express();

const PORT = 4000

app.use(express.static('./dist'));
app.set('port', (process.env.PORT || PORT));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(process.env.PORT || PORT, function () {
  console.log(`App listening on port ${app.get('port')}!`);
});
