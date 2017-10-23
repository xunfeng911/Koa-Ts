import { Context } from 'koa';
import { GET, routePrefix, required } from '../middleware/route/decorator';

@routePrefix("/home")
export class TestController {
  
      constructor() {
          console.log("create new instance home");
      }
    
    
      @GET("/")
      @GET("index")
      @required({ query: 'username' })
      async index(ctx: Context): Promise<void> {
          ctx.body = {
              query: ctx.query,
              message: "hello"
          };
      }
  }