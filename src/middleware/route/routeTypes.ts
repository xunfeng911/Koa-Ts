export interface RouteType {
  constructor: Function,
  middleware: Function[]
}

export interface RoutePrefixType {
  constructor: Function,
  prefix: string
}

export interface PathType {
  method: string,
  path: string
}
