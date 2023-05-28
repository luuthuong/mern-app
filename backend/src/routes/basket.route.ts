import {Application} from "express";
import basketController from "../controllers/basket.controller";
import {CommonRoutesConfig} from "../config/common-routes.config";
import authMiddleware from "../middlewares/auth.middleware";

class BasketRoute extends CommonRoutesConfig{
    constructor(app: Application) {
        super(app);
    }
    basePath(): string {
        return "/api/basket";
    }

    configureRoutes(): void {
        this.get(':id', [authMiddleware.verifyToken, basketController.getBasketById]);
    }
}
export  default BasketRoute;