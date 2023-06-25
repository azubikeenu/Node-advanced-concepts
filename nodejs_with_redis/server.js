const express = require('express');
const routes = require('./routes');
const { PORT, REDIS_URL } = require('./config');
const redis = require('redis');

const app = express();

app.use('/jph', routes);

app.listen(PORT, () => console.log(`Server is running on PORT : ${PORT}`));
