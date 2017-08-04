const serverEvents = ['onPreStart', 'onPostStart', 'onPreStop', 'onPostStop'];
const requestEvents = ['onRequest', 'onPreAuth', 'onPostAuth', 'onPreHandler', 'onPostHandler', 'onPreResponse'];

class HapiPluginFactory {
  fromObject(plugin) {
    if (!plugin.name) {
      throw new Error('Plugin must have "name" property set');
    }

    const register = function(server, options, next) {
      try {
        //TODO async
        if (plugin.register) {
          plugin.register(server, options);
        }

        for (const eventName of serverEvents) {
          if (plugin[eventName]) {
            server.ext(eventName, (server, next) => {
              plugin[eventName](server).then(() => next(), next);
            });
          }
        }

        for (const eventName of requestEvents) {
          if (plugin[eventName]) {
            server.ext(eventName, (request, reply) => {
              plugin[eventName](request).then(() => reply.continue(), reply);
            });
          }
        }

        next();
      } catch(e) {
        next(e);
      }
    };

    register.attributes = {
      name: plugin.name
    };

    return register;
  }

}

module.exports = HapiPluginFactory;
