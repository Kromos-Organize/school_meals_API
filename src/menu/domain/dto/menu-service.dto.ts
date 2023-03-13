export interface MenuCreateAttr {
    school_id: number;
    type_id: number;
    paid_price: number;
    free_price: number;
    date: Date;
}

export interface TypeMenuCreateAttr {
    type_menu: string
}