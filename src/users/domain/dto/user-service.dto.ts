export interface IUserModelAttr {
    school_id?: number;
    role: string;
    email: string;
    password: string;
    phone: string;
    fname?: string;
    name?: string;
    lname?: string;
    birthday?: string;
    isActive?: boolean;
}

export interface IUserUpdateModel {
    phone?: string;
    fname?: string;
    name?: string;
    lname?: string;
    birthday?: string;
    isActive?: boolean;
}