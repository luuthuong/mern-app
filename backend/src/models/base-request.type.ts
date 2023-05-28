import express, {Response} from "express";

export interface BaseRequest<TReq = any, TRes = any, TObj extends Record<string, any> = Record<string, any>> extends express.Request{
    res?: Response<TRes, TObj> | undefined;
    body: TReq;
}
