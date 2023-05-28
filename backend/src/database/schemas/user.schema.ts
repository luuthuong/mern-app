import {Schema, model} from 'mongoose';
import {User, UserMethod, UserModelType} from "../types";

const userSchema = new Schema<User, UserModelType, UserMethod>({
    userName: {type: String, required: true, minlength: 8},
    email: {type: String, required: true},
    firstName: String,
    lastName: String,
    password: String,
    accessToken: String,
    refreshToken: String
}, {
    timestamps: true
});

userSchema.method('displayName' as keyof(UserMethod), function(){
    return `${this.firstName} ${this.lastName}`
});

export const UserModel = model<User, UserModelType>('User', userSchema);
