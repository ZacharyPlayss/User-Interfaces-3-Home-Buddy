export type Room={
    id:string,
    name:string,
    description?:string,
    width:number,
    height:number,
    x:number,
    y:number,
    floorId:string
}

export type NewRoom = Omit<Room, 'id'>
export type NewRoomWithoutFloor = Omit<NewRoom, 'floorId'>