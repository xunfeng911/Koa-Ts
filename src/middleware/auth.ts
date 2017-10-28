import * as Koa from 'koa';
import redisClient from './redis/redis';
import * as jwt from 'jsonwebtoken';
import _config from '../../config/index';


export const signToken = (userId: string) => {
  const jwtConfig = _config.jwtObj;
  const token = jwt.sign(
    { userId: userId },
    jwtConfig.secret,
    { 'expiresIn': jwtConfig.time }
  );
  redisClient.set(userId, token);
  return token;
}

export const verifyToken = async (ctx: Koa.Context, user: any, token: string) => {
  let userId = user.userId;
  try {
    let vtoken: any = await redisClient.get(userId);
    if (token != vtoken) {
      throw("Invalid token")
    } else {
      return Promise.resolve(false);
    }
  } catch (err) {
    ctx.throw(401, 'invalid token, please restart')
  }
}

/**
 * 清除redis记录
 * @param ctx 
 */
export async function clearToken(ctx: Koa.Context, next: any){
  let jwtConfig = _config.jwtObj;
  let _user = ctx.state[jwtConfig.key];
  //清除token
  redisClient.del(_user['userId']);
  await next();
}

/**
* 刷新token在redis中存储时间
* @param token
*/
export async function expireToken(token: string, userId: string){
  let jwtConfig = _config.jwtObj;
  await redisClient.set(userId, token);
}