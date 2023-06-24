const { consumeMessageFromQueue } = require('../utils');

(async function () {
  try {
    const queueName = 'FabSeries2';
    await consumeMessageFromQueue(queueName);
  } catch (err) {
    console.log('Something went wrong' + err?.message);
    process.exit();
  }
})();
