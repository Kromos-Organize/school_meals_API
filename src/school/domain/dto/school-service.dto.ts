export interface ISchoolCreationAttrs {
    name:string
    region:string
    area?:string
    city:string
    street:string
    homeNumber:number
}

export interface ISchoolParam{
    name:string
    city:string
    street:string
    homeNumber:number
}

export interface ISchoolUpdate {
    name?:string
    region?:string
    area?:string
    city?:string
    street?:string
    homeNumber?:number
}