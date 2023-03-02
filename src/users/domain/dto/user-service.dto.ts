export interface IUserModelAttr {
    school_id?: number;
    role: string;
    email: string;
    password: string;
    phone: string;
    fname?: string;
    name?: string;
    lname?: string;
    birthday?: number;
    isActive?: boolean;
}

export interface IUserUpdateModel {
    school_id?: number;
    phone?: string;
    fname?: string;
    name?: string;
    lname?: string;
    birthday?: number;
}

export interface ICheckUserReturns extends IValidateUserEmailReturns{
    password: string;
}

export interface IValidateUserEmailReturns {
    id: number
    email: string;
    role: string;
}

export interface IActiveUser {
    isActive: boolean
}