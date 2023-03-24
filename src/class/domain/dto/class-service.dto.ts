
export interface ICreateClass {
    school_id: number,
    number: number,
    type: string
    category?: ClassCategoryEnum
}

export interface IUpdateClass {
    number: number,
    type: string
    category?: ClassCategoryEnum
}

export enum ClassCategoryEnum {
    junior = 'junior',
    elder = 'elder'
}