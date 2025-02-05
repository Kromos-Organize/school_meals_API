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
    id: number,
    email:string,
    role: string,
}

export interface ISuperAdmin {
    id: number,
    email: string,
    role: string,
    name: string,
    fname: string,
    position: string,
    chat_number: string
}