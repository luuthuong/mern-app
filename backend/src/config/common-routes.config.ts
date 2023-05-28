import {Application, NextFunction} from "express";
import {BaseRequest} from "../models/base-request.type";
import {BaseResponse} from "../models/base-response";

export abstract class CommonRoutesConfig{
    protected readonly app: Application;
    protected constructor(private _app: Application) {
        this.app = _app;
        this.configureRoutes();
    }
    abstract basePath(): string;
    abstract configureRoutes(): void;
    private get getBasePath(){
        const pattern = /\/$/;
        const basePath = this.basePath();
        return basePath.endsWith('/') ? basePath.replace(pattern, "") : basePath;
    }

    protected get<TReq = any,TRes = any>(path: string,  handlers: ((request: BaseRequest<TReq>, response: BaseResponse<TRes>, next: NextFunction) => any )[]){
        this.app.get(`${this.getBasePath}/${path}`, handlers);
        return this.app;
    }

    protected post<TReq = any,TRes = any>(path: string, handlers: ((request: BaseRequest<TReq>, response: BaseResponse<TRes>, next: NextFunction) => any )[]){
        this.app.post(`${this.getBasePath}/${path}`, ...handlers);
        return this.app;
    }

    protected put<TReq = any,TRes = any>(path: string,  handler: ((request: BaseRequest<TReq>, response: BaseResponse<TRes>, next: NextFunction) => any )[]){
        this.app.put(`${this.getBasePath}/${path}`, ...handler);
        return this.app;
    }

    protected delete<TReq = any,TRes = any>(path: string,  handler: ((request: BaseRequest<TReq>, response: BaseResponse<TRes>, next: NextFunction) => any )[] ){
        this.app.delete(`${this.getBasePath}/${path}`, ...handler);
        return this.app;
    }
}