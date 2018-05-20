const express = require('express');
const app = express();

const path = require('path');

app.use(express.static(__dirname + '/client'));

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/client/index.html');
});


app.listen(process.env.PORT || 3000, (req, res) => {
  console.log('Listening to port 3000');
})