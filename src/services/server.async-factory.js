const Hapi = require('hapi');

module.exports = async function serverAsyncFactory(serverOpts, hapiPluginFactory, helloWorldHapiPlugin) {
  const server = new Hapi.Server({ debug: { request: ['error'] } });
  server.connection(serverOpts.connection);

  await server.register(hapiPluginFactory.fromObject(helloWorldHapiPlugin));

  return server;
};
