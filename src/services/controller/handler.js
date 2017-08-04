class ControllerHandler {
  constructor(helloWorldService) {
    this.helloWorldService = helloWorldService;
  }

  async helloPlain(request) {
    const {query} = request;

    const {message} = await this.helloWorldService.sayHello({
      name: query.name
    });

    return message;
  }

  async helloJson(request) {
    const {query} = request;

    const {message} = await this.helloWorldService.sayHello({
      name: query.name
    });

    return {
      message
    };
  }

  async errorGeneric(request) {
    await this.helloWorldService.throwGenericError();
  }

  async errorBoom(request) {
    await this.helloWorldService.throwBoomError();
  }
}

module.exports = ControllerHandler;
