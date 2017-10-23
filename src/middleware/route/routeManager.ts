import { PathType, RouteType, RoutePrefixType } from './routeTypes';
class RouteManager {
  private _routeMap = new Map<PathType, RouteType>();
  private _routePrefixMap = new Map<string, string>();

  public regeisterRoute(route: RouteType & PathType): RouteManager {
    this._routeMap.set(
      { method: route.method, path: route.path },
      // { constructor: route.constructor, function: route.function, middleware: route.middleware }
      { constructor: route.constructor, middleware: route.middleware }
    );
    return this;
  }

  public registerRoutePerfix(routePrefixInfo: RoutePrefixType): RouteManager {
    this._routePrefixMap.set(
      routePrefixInfo.constructor.name,
      routePrefixInfo.prefix
    );
    return this;
  }

  public getRoutePrefix(routeClass: Function): string {
    let prefix = this._routePrefixMap.get(routeClass.name);
    if (!prefix) {
      prefix = "/";
    }
    if (prefix[prefix.length - 1] !== "/") {
      prefix += "/";
    }
    return prefix;
  }
  public get routeMap(): Map<PathType, RouteType> {
    return this._routeMap;
  }
}


export const routeManage = new RouteManager();