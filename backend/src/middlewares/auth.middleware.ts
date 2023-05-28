import {BaseRequest} from "../models/base-request.type";
import {RegisterRequest} from "../models/auth";
import {BaseResponse} from "../models/base-response";
import {NextFunction} from "express";
import {UserModel} from "../database/schemas";
import {TokenService} from "../services/token.service";

class AuthMiddleware {
    verifyToken(req: BaseRequest, res: BaseResponse<any>, next: NextFunction){
        if(!req.headers['authorization'])
            return res.status(401).json({
                status: 'error',
                code: 401,
                message: 'Missing token'
            });

        const authorizations = req.headers.authorization?.split(' ') ?? [];
        if(authorizations[0] !== 'Bearer')
            return res.status(400).json({
                status: 'error',
                code: 400,
                message: 'Invalid token'
            });

        try {
            TokenService.verifyToken(authorizations[1], 'accessToken');
            return next();
        }
        catch (e) {
            return res.status(401).json({
                status: 'error',
                code: 401,
                message: 'Token invalid or expired!'
            });
        }
    }

    async validateRegisterUser(req: BaseRequest<RegisterRequest>, res: BaseResponse<any>, next: NextFunction) {
        const request = req.body;
        if (request.email && request.userName && request.displayName && request.password) {
            const isExistedEmail = await UserModel.exists({email: request.email});
            if (isExistedEmail?._id)
                return res.status(400).json({
                    status: 'error',
                    message: 'Email existed'
                });

            const isExistedUserName = await UserModel.exists({userName: request.userName})
            if (isExistedUserName?._id)
                return res.status(400).json({
                    status: 'error',
                    message: 'username existed'
                });
            return next();
        }

        return res.status(400).json({
            status: 'error',
            message: 'Missing required field, check again'
        });
    }
}

export default new AuthMiddleware();