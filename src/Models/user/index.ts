import * as Mongoose from "mongoose";

export interface XUser extends Mongoose.Document {
    username: string;
    email: string;
    password: string;
};

export const UserSchema = new Mongoose.Schema({
    tel: { 
        type: Number, 
        //是否校验重复
        unique: true, 
        required: true 
    },
    username: { 
        type: String, 
        required: true 
    },
    password: { 
        type: String,
        required: true 
    },
    createTime: {
        type: Date,
        default: Date.now
    },
    updateTime: {
        type: Date,
        default: Date.now
    }
},{
    versionKey: false,
    timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
});

export const UserModel = Mongoose.model<XUser>('User', UserSchema);