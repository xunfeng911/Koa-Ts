
const NODE_ENV = process.env.NODE_ENV || 'dev';
let _config;

switch (NODE_ENV) {
  case 'dev':
    _config =  require('./config.dev');
    break;
  case 'prod':
    _config = require('./config.prod');
  default:
    // console.log('don\'t have this NODE_ENV');
    throw "don\'t have this NODE_ENV";
}
export default _config.default;