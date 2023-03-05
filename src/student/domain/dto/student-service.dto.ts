export interface StudentCreationAttrs {
    school_id: number;
    class_id: number;
    fname: string;
    name: string;
    lname?: string;
    birthday?: Date;
    isLargeFamilies?: boolean;
    m_phone: string;
    f_phone: string;
}

export interface IParamStudent {
    school_id: number;
    class_id: number;
    fname: string;
    name: string;
}

export interface IParamStudent {
    school_id: number;
    class_id: number;
    fname: string;
    name: string;
}

export interface IUpdateStudent {
    fname?: string;
    name?: string;
    lname?: string;
    birthday?: Date;
    isLargeFamilies?: boolean;
    m_phone: string;
    f_phone: string;
}

export interface IPhoneParentsModel {
    phone_id: number;
    student_id: number;
    m_phone: string;
    f_phone: string;
}