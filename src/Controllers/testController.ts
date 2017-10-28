import {Context} from 'koa';
import { GET, routePrefix, required } from '../middleware/route/decorator';
import { signToken } from '../middleware/auth';
import BaseClass from '../Util/BaseClass';

@routePrefix("/home")
export class TestController extends BaseClass {

  constructor() {
    super();
    console.log("create new instance home");
  }

  @GET("/")
  @GET("index")
  @required({query: 'username'})
  async index(ctx : Context) : Promise < void > {
    ctx.body = {
      query: ctx.query,
      message: "hello"
    };
  }

  @GET("login")
  @required({query: ['username', 'userid']})  
  async login(ctx: Context): Promise<void> {
    ctx.body = {
      token: signToken(ctx.query.userid),
      username: ctx.query.username
    }
  }
 }

