export interface KoaConfig {
  port: number;
  ENV: 'dev' | 'prod';
  jwtObj: {
    secret: string;
    key: string;
    time: string;
    debug: boolean;
    unless?: Array<string>;
  }
}