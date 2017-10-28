import * as Mongoose from "mongoose";
import { XUser, UserModel } from '../../Models/user/index';

//mongo入参
export interface DbConfig {
    host: string,
    user ?: string,
    pwd ?: string
}

// mongo绑定model
export interface Database {
    userModel: Mongoose.Model<XUser>;
}

//连接mongo
export function init(config: DbConfig) {
    //mongo设置promise
    (<any>Mongoose).Promise = global.Promise;
    const options = {
        useMongoClient: true,
        // user: config.user ||'admin',
        // pass: config.pwd || 'admin'
    }
    Mongoose.connect(config.host, options);
    const db = Mongoose.connection;
    db.on('error', () => {
      console.log(`Unable to connect to database: ${config.host}`);
    });
    db.once('open', () => {
      console.log(`Connected to database: ${config.host}`);
    });
    return {
        userModel: UserModel
    }
}