export interface IUserModelAttr {
    school_id?: number;
    role: string;
    email: string;
    password: string;
    phone: string;
    fname?: string;
    name?: string;
    lname?: string;
    birthday?: Date;
    isActive?: boolean;
}

export interface IUserUpdateModel {
    school_id?: number;
    phone?: string;
    fname?: string;
    name?: string;
    lname?: string;
    birthday?: Date;
}

export interface ICheckUserReturns extends IValidateUserEmailReturns{
    password: string;
}

export interface IValidateUserEmailReturns {
    id: number
    email: string;
    role: string;
    fname: string;
    name: string;
}

export interface IActiveUser {
    isActive: boolean
}

export interface ICreateEmployee {
    email: string,
    school_id: number,
    phone: string
}

export interface IRecoveryData {
    user_id: number
    recovery_code: string
    expired_date: Date
    is_confirmed: boolean
}

export interface IListUsersSchool {
    school_id: number 
    type_user: "EMPLOYEE" | "USERS"
}

export interface ISearchQueryUser {
    id?: number
    fname?: string
    name?: string
}