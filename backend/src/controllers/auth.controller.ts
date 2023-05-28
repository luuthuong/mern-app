import {BaseRequest} from "../models/base-request.type";
import {LoginRequest, LoginResponse, RegisterRequest, TokenResponse} from "../models/auth";
import {BaseResponse} from "../models/base-response";
import {UserModel} from "../database/schemas";
import {UserDTO} from "../dto/user.dto";
import {TokenService} from "../services/token.service";
import {JwtPayload} from "jsonwebtoken";

class AuthController {
    async login(req: BaseRequest<LoginRequest>, res: BaseResponse<LoginResponse>) {
        const request = req.body;
        const user = await UserModel.findOne({userName: request.userName});
        if (!user)
            return res.json({
                status: 'error',
                message: 'Login failed'
            });

        const {id, email, userName, firstName, lastName} = user;
        const userDTO: UserDTO = {id, email, userName, firstName, lastName };

        const accessToken = TokenService.generateAccessToken(userDTO);
        const refreshToken = TokenService.generateRefreshToken(userDTO);

        user.refreshToken = refreshToken;
        user.accessToken = accessToken;
        await user.save();

        const response: LoginResponse ={
            email: user.email,
            userName: user.userName,
            accessToken: accessToken,
            refreshToken: refreshToken
        };

        return res.status(200).json({
            status: 'success',
            message: 'Login success',
            data: response,
            code: 200
        })
    }

    async register(req: BaseRequest<RegisterRequest>, res: BaseResponse<string>) {
        const request = req.body;
        const user = new UserModel({
            email: request.email,
            userName: request.userName,
            password: request.password
        });

        const result = await user.save();
        return res.json({
            status: 'success',
            data: result.id
        });
    }

    async refreshToken(req: BaseRequest, res: BaseResponse<any>){
        const decode = TokenService.verifyToken(req.headers.authorization?.split(' ')[1] as string, 'accessToken') as JwtPayload & UserDTO;
        const user = await UserModel.findById(decode.id);

        if(!user)
            return res.status(404).json({
                status: 'error',
                message: 'user not found'
            });

        const userDTO: UserDTO = {
            id: user.id,
            userName: user.userName,
            email: user.email,
            lastName: user.lastName,
            firstName: user.firstName
        };

        const accessToken: string = TokenService.generateAccessToken(userDTO);
        const refreshToken: string = TokenService.generateRefreshToken(userDTO);

        user.refreshToken = refreshToken;
        user.accessToken = accessToken;
        await user.save();

        return res.status(200).json({
            status: 'success',
            code: 200,
            data: {
                accessToken,
                refreshToken
            } as TokenResponse
        })
    }


}

export default new AuthController();