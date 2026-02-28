const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', "index.html"));
})

app.get('/export', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', "export.html"));
})

app.get('/gallery', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', "gallery.html"));
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})
