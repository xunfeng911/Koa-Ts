import { routeManage } from './routeManager';
import * as Koa from 'koa';
import config from '../../../config/config.prod';

export const routePrefix = (prefix: string): ClassDecorator => {
  return target => {
    routeManage.registerRoutePerfix({ constructor: target, prefix });
  }
}

export const route = (method: string, path: string) => {
  return <T extends object, R extends Promise<any>>
    (target: T, name: keyof T, descriptor: TypedPropertyDescriptor<(...args: any[]) => R>) => {
    // console.log(target[name])
    routeManage.regeisterRoute({
      constructor: target.constructor,
      // function: descriptor.value,
      method,
      middleware: target[name],
      path
    });
    }  
}

export const ALL = (path: string) => {
  return route("ALL", path);
};
export const GET = (path: string) => {
  return route("GET", path);
};
export const POST = (path: string) => {
  return route("POST", path);
};
export const DELETE = (path: string) => {
  return route("DELETE", path);
};
export const PUT = (path: string) => {
  return route("PUT", path);
};
export const OPTIONS = (path: string) => {
  return route("OPTIONS", path);
};

/**
 * url参数
 * list/:id?username=zhangsan&&age=30
 * @required({query: 'username'}) 
 * @required({query: ['username','age'],params: 'id'}) 
 */
export const required = (args: any) => {
  return function (target: any, name: string, descriptor: PropertyDescriptor) {
      return requireDescriptor(target, name, descriptor, args);
  }
}

/**
 * URL必传参数校验
 * @required({params: 'username'})
 * @required({params: ['username','age']})
 * @required({query: 'username'})
 */
const requireDescriptor = (target: any, name: string, descriptor: PropertyDescriptor, rules: any) => {

  const middleware = async (ctx: any, next: any) => {
    console.log('a')
    if (rules.query) {
        rules.query = sureIsArray(rules.query);
        for (let name of rules.query) {
          if (!ctx.query[name]) {
            ctx.body = `GET Request query: ${name} required`;
            ctx.throw(412, `GET Request query: ${name} required`);
          };
        }
    }
    if (rules.params) {
        rules.params = sureIsArray(rules.params);
        for (let name of rules.params) {
          if (!ctx.params[name]) {
            ctx.body = `GET Request params: ${name} required`;
            ctx.throw(412, `GET Request params: ${name} required`);
          };
        }
    }
    await next();
  }

  target[name] = sureIsArray(target[name]);
  target[name].splice(target[name].length - 1, 0, middleware);
  return descriptor;

}
/**
 * 转换数组
 */
const sureIsArray = (arr: any) => {
  return Array.isArray(arr) ? arr : [arr];
}


/**
 * 修饰方法
 * @params 
 * @convert(async function(ctx, next){await next()})
 */
export const addFunc = (middleware: any) => {
  return decorate(function(target: any, name: string, descriptor: PropertyDescriptor, middleware: Function){
    target[name] = sureIsArray(target[name]);
    target[name].splice(target[name].length - 1, 0, middleware);
    return descriptor;
  }, sureIsArray(middleware));
}

const isDescriptor = (desc: PropertyDescriptor) => {
  if (!desc || !desc.hasOwnProperty) return false;
  for (let key of ['value', 'initializer', 'get', 'set']) {
    if (desc.hasOwnProperty(key)) return true;
  }
  return false;
}

const last = (arr: any) => {
  return arr[arr.length - 1];
}

const decorate = (handleDescriptor: Function, entryArgs: any) => {
  if (isDescriptor(last(entryArgs))) return handleDescriptor(entryArgs);
  else return function () {
      return handleDescriptor(...arguments, ...entryArgs);
  }
}