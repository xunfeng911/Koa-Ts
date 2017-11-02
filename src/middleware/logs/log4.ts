import logFun from './logger';
import * as Koa from 'koa';
import * as cls from 'colors';

const koaLog = function () {
  return async (ctx: Koa.Context, next: any) => {
    let start: any = new Date();
    let ms: any;
    try {
      //开始进入到下一个中间件
      await next();
      let b: any = new Date();
      ms = b- start;
  
      //记录响应日志
      logFun.logResponse(ctx, ms);
      console.log(cls.green(`${ctx.method} ${ctx.url} - ${ms}ms`))
  
    } catch (error) {
      if (error.name != 'UnauthorizedError') {
        let b: any = new Date();
        ms = b - start;
        //记录异常日志
        logFun.logError(ctx, error, ms);
      }
    }
  }
}
export default koaLog;