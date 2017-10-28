import * as sourceMap from "source-map-support";
import * as cls from 'colors';
import * as Koa from 'koa';
import * as bodyParser from "koa-bodyparser";
import * as Json from 'koa-json';
import * as jwt from 'koa-jwt';
import * as kcors from 'kcors';
import * as Router from "koa-router";
import { RouteBuild } from './src/middleware/route/routeBuild';
import koaError from './src/middleware/error';
import "./src/Controllers";
import _config from './config/index';
import koaLog from './src/middleware/logs/log4';
import * as mongoDb from './src/middleware/mongo/mongo';

sourceMap.install();

const app = new Koa();
const routeBuild = new RouteBuild();

mongoDb.init(_config.mongo);
app.use(bodyParser());
app.use(Json());
app.use(koaLog());
app.use(kcors());
app.use(koaError);


app.use(jwt({
  secret: _config.jwtObj.secret,
  key: _config.jwtObj.key,
  debug: _config.jwtObj.debug,
  passthrough: true,
}).unless({ path: [] }));

app.use(routeBuild.routes());
app.use(routeBuild.allowedMethods());

app.on('error', (err: any, ctx: Koa.Context) => {
  console.log(cls.red('server error:', err, JSON.stringify(ctx)));
});

app.listen(_config.port);
console.log(cls.rainbow(`koa2 is starting at port ${_config.port}`));