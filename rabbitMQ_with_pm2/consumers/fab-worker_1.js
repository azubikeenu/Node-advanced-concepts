const { consumeMessageFromQueue } = require('../utils');

(async function () {
  try {
    const queueName = 'FabSeries1';
    await consumeMessageFromQueue(queueName);
  } catch (err) {
    console.log('Something went wrong' + err);
    process.exit();
  }
})();
