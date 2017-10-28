export interface KoaConfig {
  port: number;
  ENV: 'dev' | 'prod';
  jwtObj: {
    secret: string;
    key: string;
    time: string;
    debug: boolean;
    unless?: Array<string>;
  };
  mongo: {
    host: string;
    user?: string;
    psd?: string;
  },
  redis: {
    host: string;
    port: string;
    db: 1;
  }
}