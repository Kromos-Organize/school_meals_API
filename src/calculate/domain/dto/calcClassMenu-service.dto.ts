export interface ICreateCalcClassMenu {
    class_id: number;
    menu_id: number;
    price_id: number;
    date: Date;
}

export interface ISearchParamCCM {
    class_id?: number;
    menu_id?: number;
    date?: Date;
}