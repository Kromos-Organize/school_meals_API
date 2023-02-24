export interface ILogin {
    email: string
    password: string
    isAdminDev: boolean
}

export interface IUser {
    email: string
    password: string
    phone: string
}

export interface IPayloadJwt {
    userId: number,
    email:string,
    role: string,
}

