const express = require('express');
const cluster = require('cluster');
const totalCPUs = require('os').cpus().length;

const fabObj = require('./math_logic/fabonacci-series');

if (cluster.isMaster) {
  // master thread spawns new worker threads
  console.log(`Total Number of CPU Counts is ${totalCPUs}`);

  for (var i = 0; i < totalCPUs; i++) {
    cluster.fork();
  }

  cluster.on('online', (worker) => {
    console.log(
      `Worker Id is ${worker.id} and PID  ${worker.process.pid} is online`
    );
  });

  cluster.on('exit', (worker) => {
    console.log(
      `Worker Id ${worker.id} and PID is ${worker.process.pid} is offline`
    );
    console.log("Let's fork new worker!");
    cluster.fork();
  });
} else {
  // let the worker threads handle requests
  const app = express();
  app.get('/', (request, response) => {
    console.log(
      `Worker Process Id - ${cluster.worker.process.pid} has accepted the request!`
    );

    let number = fabObj.calculateFibonacciValue(
      Number.parseInt(request.query.number)
    );
    response.send(`<h1>${number}</h1>`);
  });

  app.listen(3000, () => console.log('Express App is running on PORT : 3000'));
}
