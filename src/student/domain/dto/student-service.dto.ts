export interface StudentCreationAttrs {
    school_id: number,
    class_id: number,
    fname: string,
    name: string,
    lname?: string,
    phoneParents?: any,
    birthday?: Date,
    isLargeFamilies?: boolean,
}

export interface IParamStudent{
    school_id: number,
    class_id: number,
    fname: string,
    name: string,
}

export interface IParamStudent{
    school_id: number,
    class_id: number,
    fname: string,
    name: string,
}

export interface IUpdateStudent{
    fname?: string,
    name?: string,
    lname?: string,
    phoneParents?: any,
    birthday?: Date
    isLargeFamilies?: boolean,
}

export interface IPhoneParents {
    phone_id: number,
    student_id: number,
    m_phone: string,
    f_phone: string,
}

interface IPhone {
    m_phone: string,
    f_phone: string,
}