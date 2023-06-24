const { RABBIT_MQ_URI } = require('./config');
const amqp = require('amqplib');

const createConnection = async () => {
  const connection = await amqp.connect(RABBIT_MQ_URI);
  return connection || false;
};

const sendMessageToQueue = async (message, queueName) => {
  try {
    const connection = await createConnection();
    if (!connection) {
      console.error('Connection Failed');
      return false;
    }
    const channel = await connection.createChannel();
    await channel.assertQueue(queueName, { durable: false });
    return channel.sendToQueue(queueName, Buffer.from(message));
  } catch (err) {
    console.error(`An error occured while sending message : ${err}`);
  }
};

const consumeMessageFromQueue = async (queueName) => {
  try {
    const connection = await createConnection();
    if (!connection) {
      console.error('Connection Failed');
      return false;
    }
    const channel = await connection.createChannel();
    await channel.assertQueue(queueName, { durable: false });

    return await channel.consume(
      queueName,
      async (message) => {
        console.log(`Waiting for messages`);
        console.log(`${queueName} - ${message.content.toString()}`);
      },
      { noAck: true }
    );
  } catch (err) {
    console.error(`An error occured while consuming message : ${err}`);
  }
};

module.exports = {
  createConnection,
  sendMessageToQueue,
  consumeMessageFromQueue,
};
