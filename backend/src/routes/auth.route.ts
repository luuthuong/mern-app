import {Application} from "express";
import {CommonRoutesConfig} from "../config/common-routes.config";
import authController from '../controllers/auth.controller';
import authMiddleware from "../middlewares/auth.middleware";

export class AuthRoute extends CommonRoutesConfig {
    basePath(): string{
        return '/api/auth';
    }

    constructor(app: Application) {
        super(app);
    }
    configureRoutes() {
        this.post('login', [authController.login]);
        this.post('register', [authMiddleware.validateRegisterUser, authController.register]);
        this.get('refreshToken', [authMiddleware.verifyToken, authController.refreshToken])
    }
}

