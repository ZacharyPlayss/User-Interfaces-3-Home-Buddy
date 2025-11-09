import axios from "axios";
import type {Floor, FloorWithoutId, FloorWithRooms} from "../model/Floor.ts";
import {deleteRoom, getAllRoomsOnFloor} from "./roomService.ts";
import type {Room} from "../model/Room.ts";

export async function getFloor(id: string){
    const {data:floor} = await axios.get<Floor>(`/floors/${id}`)
    return floor;
}
export async function getAllFloors(){
    const {data: floors} = await axios.get<Floor[]>(`/floors`)
    floors.sort((a,b) => a.level - b.level);
    return floors
}

export async function getFloorWithRooms(id: string){
    const {data:floor} = await axios.get<FloorWithRooms>(`/floors/${id}?_embed=rooms`)
    return floor;
}

export async function getAllFloorsWithRooms(){
    const {data:floors} = await axios.get<FloorWithRooms[]>(`/floors?_embed=rooms`);
    floors.sort((a,b) => a.level - b.level);
    return floors
}

export async function addFloor(floor:FloorWithoutId){
    const {data:newFloor} = await axios.post<Floor>('/floors', floor)
    return newFloor
}

export async function doesFloorExist(floorNumber: number): Promise<boolean> {
    const { data: floors } = await axios.get<Floor[]>(`/floors?level=${floorNumber}`);
    return floors.length > 0;
}

export async function updateFloor(updatedFloor: Floor){
    const {data} = await axios.patch<Floor>(`/floors/${updatedFloor.id}`,{
        ...updatedFloor
    });
    return data;
}
export async function deleteFloor(id: string){
    await axios.delete(`/floors/${id}`)
    const rooms = await getAllRoomsOnFloor(id);

    if(rooms.length != 0){
        await Promise.all(
            rooms.map((room: Room) => {
                deleteRoom(room.id)
            })
        )
    }
}