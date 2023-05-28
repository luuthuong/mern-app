export type LoginRequest = {
    userName : string;
    password: string;
}

export type TokenResponse = {
    readonly accessToken: string;
    readonly refreshToken: string;
}

export type LoginResponse = TokenResponse & {
    readonly userName: string;
    readonly email: string;
}
