const express = require('express');

const fabObj = require('./math_logic/fabonacci-series');

// let the worker threads handle requests
const app = express();

app.get('/', (request, response) => {
  let number = fabObj.calculateFibonacciValue(
    Number.parseInt(request.query.number)
  );
  response.send(`<h1>${number}</h1>`);
});

app.listen(3000, () => console.log('Express App is running on PORT : 3000'));
