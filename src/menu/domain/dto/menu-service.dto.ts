export interface IMenuCreateAttr {
    school_id: number;
    type_id: number;
    paid_price: number;
    free_price: number;
    date: Date;
}

export interface IMenuUpdate {
    paid_price: number;
    free_price: number;
    date: Date;
}

export interface ITypeMenuCreateAttr {
    school_id: number
    type_menu: string
}

export interface ITypeMenuUpdate {
    type_menu: string
}