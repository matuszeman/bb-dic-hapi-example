const {dic} = require('./dic');

(async function() {
  const server = await dic.getAsync('server');

  // Start the server
  await server.start();

  console.log('Server running at:', server.info.uri);
})().catch(e => {
  console.error('Startup error:', e);//XXX
  process.exitCode = 1;
});
