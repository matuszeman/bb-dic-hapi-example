const {Dic, DicLoader, DicConfigLoader} = require('@kapitchi/bb-dic');

const dic = new Dic();

//DicLoader: registers all classes under services folder into dic
const serviceLoader = new DicLoader({
  rootDir: __dirname + '/src/services',
  debug: true
});
serviceLoader.loadPath(dic, '**/*.js');

//ConfigLoader: loads dic configuration from config/default.js file
const configLoader = new DicConfigLoader({
  debug: true
});
const config = require('config');
configLoader.loadConfig(dic, config.dic);

module.exports = {
  dic
};
