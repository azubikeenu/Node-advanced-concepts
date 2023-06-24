const { sendMessageToQueue } = require('../utils');
const fabObj = require('../math_logic/fabonacci-series');

async function sendValueInFabQueue2(num) {
  try {
    const queueName = 'FabSeries2';
    const message = String(fabObj.calculateFibonacciValue(num));
    const res = await sendMessageToQueue(message, queueName);
    if (!res) throw new Error('Message not sent');
  } catch (err) {
    console.log(err?.message);
    process.exit();
  }
}

module.exports = sendValueInFabQueue2;
