import { KoaConfig } from './config.type';
const config: KoaConfig = {
  port: 3040,
  ENV: 'dev',
  jwtObj: {
    secret: 'wsd',
    key: 'xuncs',
    time: '1d',
    debug: true,
  },
  mongo: {
    host: 'mongodb://127.0.0.1:27017/test'
  },
  redis: {
    host: 'localhost',
    port: '6379',
    db: 1
  }
}

export default config;