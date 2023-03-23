
export interface ICreateClass {
    school_id: number,
    number: number,
    type: string
}

export interface IUpdateClass {
    number: number,
    type: string
}

export enum ClassCategoryEnum {
    junior = 'junior',
    elder = 'elder'
}