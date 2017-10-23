import { KoaConfig } from './config.type';
const config: KoaConfig = {
  port: 3040,
  ENV: 'prod',
  jwtObj: {
    secret: 'wsd',
    key: 'xuncs',
    time: '1d',
    debug: true,
  }
}

export default config;