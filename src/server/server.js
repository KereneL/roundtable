const next = require('next');
const { createServer } = require('node:http');
const initializeSocketIO = require('./socket'); // Adjust based on your structure

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  const httpServer = createServer(handle);
  const envPort = process.env.PORT || 3000;
  const envHostName = process.env.HOST_NAME || 'localhost';

  initializeSocketIO(httpServer, envHostName, envPort)

  httpServer.listen(envPort, () => {
    const add = `http://${envHostName}:${envPort}`
    console.log(`\n🏰 \x1b[2mHTTP server ready on \x1b[34m\x1b[1m${add}\x1b[0m\n`);

  });
});
