const {AbstractService, Joi} = require('@kapitchi/bb-service');
const Boom = require('boom');

class HelloWorldService extends AbstractService {
  async sayHello(params) {
    params = this.params(params, {
      name: Joi.string().optional().default('kapitchi')
    });

    return {
      message: `hello world! From: ${params.name}`
    };
  }

  async throwGenericError() {
    throw new Error('Some error');
  }

  async throwBoomError() {
    throw Boom.badRequest('Sorry, my bad');
  }
}

module.exports = HelloWorldService;
