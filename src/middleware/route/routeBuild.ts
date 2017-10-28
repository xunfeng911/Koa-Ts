import * as Router from "koa-router";
import { routeManage } from './routeManager';
import { route } from './decorator';
import * as cls from 'colors';



export class RouteBuild {
  private _router: Router;
  private _built: boolean;

  constructor() {
    this._router = new Router();
    this._built = false;
  }

  private build = () => {
    if (!this._built) {
      for (let [pathInfo, routeInfo] of routeManage.routeMap) {
        let prefix: string = routeManage.getRoutePrefix(routeInfo.constructor);
        let path: string = pathInfo.path;
        if (!path.startsWith("/")) {
          path = prefix + path;
        }
        
        routeInfo.middleware.forEach(itm => {
          this._router[pathInfo.method.toLowerCase()](path, itm);
        });
        console.log(cls.green(`${pathInfo.method}: ${path}`));
      }
      this._built = true;
    }
  }

  public routes = () => {
    this.build();
    return this._router.routes();
  }

  public allowedMethods = () => {
    return this._router.allowedMethods();
  }
}