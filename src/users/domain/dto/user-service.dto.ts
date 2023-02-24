import {ApiProperty} from "@nestjs/swagger";
import {IsPhoneNumber, IsString, Length} from "class-validator";

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
    school_id?: number;
    phone?: string;
    fname?: string;
    name?: string;
    lname?: string;
    birthday?: string;
    isActive?: boolean;
}

export interface IRegisterUser {
    email: string;
    password: string;
    phone: string;
}