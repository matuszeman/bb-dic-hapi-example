/**
 * Route handlers are implemented as "controller action" methods
 */
class ControllerHapiPlugin {
  constructor(controllerHandler) {
    this.name = 'controller';

    this.controller = controllerHandler;
  }

  register(server, options) {
    this.registerRoutes(server);
  }

  createHandler(fn) {
    return async (request, reply) => {
      const ret = await fn(request);
      reply(ret);
    }
  }

  registerRoutes(server) {
    server.route({
      method: 'GET',
      path:'/controller/hello/plain',
      handler: this.createHandler(this.controller.helloPlain.bind(this.controller))
    });

    server.route({
      method: 'GET',
      path:'/controller/hello/json',
      handler: this.createHandler(this.controller.helloJson.bind(this.controller))
    });

    server.route({
      method: 'GET',
      path:'/controller/error/generic',
      handler: this.createHandler(this.controller.errorGeneric.bind(this.controller))
    });

    server.route({
      method: 'GET',
      path:'/controller/error/boom',
      handler: this.createHandler(this.controller.errorBoom.bind(this.controller))
    });
  }
}

module.exports = ControllerHapiPlugin;
