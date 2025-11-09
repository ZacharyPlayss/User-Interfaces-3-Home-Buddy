import type {Room} from "./Room.ts";

export type Floor= {
    id:string,
    name:string,
    description?:string,
    width:number,
    height:number,
    x:number,
    y:number,
    level:number
}

export type FloorWithoutId = Omit<Floor, 'id'>

export type FloorWithRooms={
    id:string,
    name:string
    description:string,
    width:number,
    height:number,
    x:number,
    y:number,
    level:number,
    rooms:Room[]
}