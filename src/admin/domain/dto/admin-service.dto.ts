
export interface IMainAttrAdmin {
    email: string
    password: string
    fname: string
    name: string
    position: string
    chat_number?: string
}

export interface IAdminCreationAttrs extends IMainAttrAdmin{
    role: string
}

export interface IUpdateAdminAttrs {
    fname: string
    name: string
    position: string
    chat_number?: string
}