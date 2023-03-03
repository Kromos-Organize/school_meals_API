export interface StudentCreationAttrs {
    school_id: number,
    class_id: number,
    fname: string,
    name: string,
    lname?: string,
    phoneParents?: string,
    birthday?: Date
    isLargeFamilies?: boolean
}

export interface IParamStudent{
    school_id: number,
    class_id: number,
    fname: string,
    name: string
}

export interface IParamStudent{
    school_id: number,
    class_id: number,
    fname: string,
    name: string
}

export interface IUpdateStudent{
    fname?: string,
    name?: string,
    lname?: string,
    phoneParents?: string,
    birthday?: Date
    isLargeFamilies?: boolean
}