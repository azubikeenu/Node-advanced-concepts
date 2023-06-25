const express = require('express');

const { client } = require('./utils');

const redisMiddleware = require('./middlewares/redis.middleware');

const usersApi = require('./apis/users');
const postsApi = require('./apis/posts');
const commentsApi = require('./apis/comments');

const routes = express.Router();

routes.use(redisMiddleware);

routes.get('/posts', (request, response) => {
  postsApi
    .fetchPosts()
    .then(
      (response) => response.json(),
      (reason) => Promise.reject(reason)
    )
    .then(
      async (data) => {
        console.log(
          `Data Fetched from Server with process ID - ${process.pid}`
        );
        await client.set('posts', JSON.stringify(data));
        response.send(data);
      },
      (reason) => response.status(500).send('Something went wrong!')
    );
});
routes.get('/comments', (request, response) => {
  commentsApi
    .fetchComments()
    .then(
      (response) => response.json(),
      (reason) => Promise.reject(reason)
    )
    .then(
      async (data) => {
        console.log(
          `Data Fetched from Server with process ID - ${process.pid}`
        );

        await client.set('comments', JSON.stringify(data));
        response.send(data);
      },
      (reason) => response.status(500).send('Something went wrong!')
    );
});
routes.get('/users', async (request, response) => {
  usersApi
    .fetchUsers()
    .then(
      (response) => response.json(),
      (reason) => Promise.reject(reason)
    )
    .then(
      async (data) => {
        console.log(
          `Data Fetched from Server with process ID - ${process.pid}`
        );

        await client.set('users', JSON.stringify(data));
        response.send(data);
      },
      (reason) => response.status(500).send('Something went wrong!')
    );
});

module.exports = routes;
