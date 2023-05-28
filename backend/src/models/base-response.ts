import express from "express";
type Response<T> = {
    status: 'error' | 'success' | 'warning',
    message?: string;
    code?: number;
    data?: T
};
export interface BaseResponse<TResponse> extends express.Response<Response<TResponse>>{

}