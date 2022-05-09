'use strict';

const express = require('express');
const multer  = require('multer');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
const upload = multer();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.get('/', (request, response) => {
  response.sendFile(__dirname + '/index.html');
});

app.post('/testForm', upload.none(), (request, response) => {
  console.log("POST");
  console.log(request.body);
  response.send(request.body);
});

app.post('/testJSON', (request, response) => {
  console.log("POST");
  console.log(request.body);
  response.send(request.body);
});

console.log(`Running on http://${HOST}:${PORT}`);
app.listen(PORT, HOST);