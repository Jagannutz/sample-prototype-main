module.exports = {
  apps: [
    {
      name: 'backend',
      script: 'app.js',
      cwd: './backend',
    },
    {
      name: 'frontend1',
      script: 'serve',
      args: '--single -l 8081 ../frontend1',
      cwd: './node_modules/.bin', // Optional, in case serve is not global
    },
    {
      name: 'frontend2',
      script: 'serve',
      args: '--single -l 8082 ../frontend2',
      cwd: './node_modules/.bin', // Optional
    },
  ],
};
