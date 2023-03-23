export interface ICreateCalcClassSum {
    class_id: number;
    price_id: number;
    date: Date;
}

export interface ISearchParamCCS {
    class_id?: number;
    date?: Date;
}