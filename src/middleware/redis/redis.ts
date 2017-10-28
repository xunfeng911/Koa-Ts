/**
 * 连接redis
 */
import * as redis from 'redis';
import _config from '../../../config/index';
const redisClient = redis.createClient();

redisClient.on('connect', ()=>{
    console.log('redis connect');
})

redisClient.on('error', (err) => {
  console.log(err);
  console.error('redis server require start');
})

export default redisClient; 