module.exports = {
  apps: [
    {
      name: 'Rabbit MQ with PM2',
      script: 'server.js',
      instances: 2,
      autorestart: true,
      exec_mode: 'cluster',
      watch: true,
      max_memory_restart: '1G',
    },
    {
      name: 'Worker1',
      script: 'workers/fab-worker_1.js',
      instances: 1,
    },
    {
      name: 'Worker2',
      script: 'workers/fab-worker_2.js',
      instances: 1,
    },
  ],
};
