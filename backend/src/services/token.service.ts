import jwt, {JwtPayload, VerifyErrors} from "jsonwebtoken";
import {TokenConfig} from "../config/token.config";

export class TokenService{
    static generateAccessToken<T extends  string | object | Buffer>(payload: T): string{
        if(!payload || !process.env.SECRET_TOKEN)
            throw("secret invalid");
        return jwt.sign(
            payload,
            process.env.SECRET_TOKEN as string,
            {
                expiresIn: TokenConfig.tokenLifeTime
            });
    }

    static generateRefreshToken<T extends  string | object | Buffer>(payload: T): string{
        if(!payload || !process.env.SECRET_TOKEN_REFRESH)
            throw("secret invalid");
        return jwt.sign(
            payload,
            process.env.SECRET_TOKEN_REFRESH as string,
            {
                expiresIn: TokenConfig.tokenRefreshLifetime
            });
    }

    static verifyToken(token: string, type: 'accessToken' | 'refreshToken', callBack ?: (err:VerifyErrors | null, decoded: string | JwtPayload | undefined) => void){
        const secretKey = type === 'accessToken' ? process.env.SECRET_TOKEN : process.env.SECRET_TOKEN_REFRESH;
        if(!secretKey)
            throw("secretKey invalid");
        if(!callBack)
            return jwt.verify(token, secretKey);
        return jwt.verify(token,secretKey, callBack);
    }
}