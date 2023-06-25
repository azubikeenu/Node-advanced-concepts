const { client } = require('../utils');

async function redisMiddleware(req, res, next) {
  switch (req.url) {
    case '/posts':
      try {
        const results = await client.get('posts');
        if (results) {
          console.log(' sent from redis!');
          return res.send(results);
        } else {
          next();
        }
      } catch (err) {
        return res.status(500).send('<h4>Something went wrong!</h4>');
      }
      break;
    case '/users':
      try {
        const results = await client.get('users');
        if (results) {
          console.log('sent from redis!');
          return res.send(results);
        } else {
          next();
        }
      } catch (err) {
        return res.status(500).send('<h4>Something went wrong!</h4>');
      }
      break;
    case '/comments':
      try {
        const results = await client.get('comments');
        if (results) {
          console.log('sent from redis!');
          return res.send(results);
        } else {
          next();
        }
      } catch (err) {
        return res.status(500).send('<h4>Something went wrong!</h4>');
      }

      break;
  }
}

module.exports = redisMiddleware;
