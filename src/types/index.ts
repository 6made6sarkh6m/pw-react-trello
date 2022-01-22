export interface IList {
    id : number,
    title : string,
    cards : ICard[]   
}

export interface ICard {
    id : number,
    title : string,
    comment : string
}