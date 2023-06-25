const redis = require('redis');

const { REDIS_URL } = require('./config');

let client;

(async () => {
  client = redis.createClient({
    url: REDIS_URL,
  });

  client.on('connect', () => console.log('Connected to redis'));
  client.on('error', (error) => console.error(`Error : ${error}`));

  await client.connect();
})();

module.exports = { client };
