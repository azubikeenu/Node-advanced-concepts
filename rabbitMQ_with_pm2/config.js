const { config } = require('dotenv');

config();

module.exports = {
  RABBIT_MQ_URI: process.env.RABBIT_MQ_URI,
};
