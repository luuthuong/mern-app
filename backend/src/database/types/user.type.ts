import {Model} from 'mongoose';

export type User = {
    userName: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    accessToken: string;
    refreshToken: string;
}

export type UserMethod = {
    displayName(): string;
}

export type UserModelType = Model<User, {} , UserMethod>;

