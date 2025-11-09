import axios from "axios";
import type {NewRoom, Room} from "../model/Room.ts";
import {deleteDomoticaControl, getAllDomoticaControlsForRoom} from "./domoticaControlService.ts";
import type {DomoticaControl} from "../model/DomoticaControl.ts";

export async function getRoom(id: string){
    const {data:room} = await axios.get<Room>(`/rooms/${id}`)
    return room;
}

export async function getAllRoomsOnFloor(floorId:string){
    const {data: rooms} = await axios.get<Room[]>(`/rooms?floorId=${floorId}`)
    return rooms
}
export async function getAllRooms(){
    const {data: rooms} = await axios.get<Room[]>(`/rooms`)
    return rooms
}

export async function addRoom(room:NewRoom){
    const {data: newRoom} = await axios.post<Room>('/rooms', room)
    return newRoom
}
export async function updateRoom(updatedRoom: Room){
    const {data} = await axios.patch<Room>(`/rooms/${updatedRoom.id}`,{
        ...updatedRoom
    });
    return data;
}
export async function deleteRoom(id: string){
    await axios.delete(`/rooms/${id}`)
    const attachedDevices = await getAllDomoticaControlsForRoom(id);
    if(attachedDevices.length != 0){
        await Promise.all(
            attachedDevices.map((domoticaControl: DomoticaControl) =>
                deleteDomoticaControl(domoticaControl.id)
            )
        );
    }
}