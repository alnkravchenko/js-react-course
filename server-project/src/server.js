'use strict';

const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response){
  response.sendFile(__dirname + '/index.html');
});

app.post('/test', function(request, response){
  console.log("POST");
  console.log(request.body);
  console.log(request.body.name);
  console.log(request.body.phone);
  response.sendStatus(200);
});

console.log(`Running on http://${HOST}:${PORT}`);
app.listen(PORT, HOST);