class HelloWorldHapiPlugin {
  constructor(helloWorldService) {
    this.name = 'helloWorld';

    this.helloWorldService = helloWorldService;
  }

  register(server, options) {
    this.registerRoutes(server);
  }

  registerRoutes(server) {
    /**
     * http://localhost:8000/hello/plain?name=joe
     */
    server.route({
      method: 'GET',
      path:'/hello/plain',
      handler: async (request, reply) => {
        const {query} = request;

        const {message} = await this.helloWorldService.sayHello({
          name: query.name
        });

        return reply(message);
      }
    });

    /**
     * http://localhost:8000/hello/json?name=joe
     */
    server.route({
      method: 'GET',
      path:'/hello/json',
      handler: async (request, reply) => {
        const {query} = request;

        const res = await this.helloWorldService.sayHello({
          name: query.name
        });

        return reply(res);
      }
    });

    /**
     * http://localhost:8000/error/generic
     */
    server.route({
      method: 'GET',
      path:'/error/generic',
      handler: async (request, reply) => {
        await this.helloWorldService.throwGenericError();

        return reply();
      }
    });

    /**
     * http://localhost:8000/error/boom
     */
    server.route({
      method: 'GET',
      path:'/error/boom',
      handler: async (request, reply) => {
        await this.helloWorldService.throwBoomError();

        return reply();
      }
    });
  }
}

module.exports = HelloWorldHapiPlugin;
