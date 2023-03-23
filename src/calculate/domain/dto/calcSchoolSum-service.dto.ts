export interface ICreateCalcSchoolSum {
    school_id: number;
    price_id: number;
    date: Date;
}

export interface ISearchParamCSS {
    school_id?: number;
    date?: Date;
}