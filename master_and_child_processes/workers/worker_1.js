const fabObj = require('../math_logic/fabonacci-series');

// listens for a message event in this child process
process.on('message', (number) => {
  let fabNum = fabObj.calculateFibonacciValue(number);
  console.log(`Fibonacci-series - 1 PID is ${process.pid}`);
  // sends a message to the worker node
  process.send(fabNum);
});
