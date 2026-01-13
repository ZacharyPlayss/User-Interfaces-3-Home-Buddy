import type { Room, NewRoom } from "../model/Room.ts";
import { deleteDomoticaControl } from "./domoticaControlService.ts";
import {db, DB_LIMITS, generateId} from "./in_memory_db/db.ts";

export async function getRoom(id: string) {
    return db.rooms.find(r => r.id === id);
}

export async function getAllRooms() {
    return db.rooms;
}


export async function getAllRoomsOnFloor(floorId: string) {
    return db.rooms.filter(r => r.floorId === floorId);
}

export async function addRoom(room: NewRoom) {
    if (db.rooms.length >= DB_LIMITS.ROOMS) throw new Error("Limit reached");
    const newRoom = { ...room, id: generateId() } as Room;
    db.rooms.push(newRoom);
    return newRoom;
}

export async function deleteRoom(id: string) {
    db.rooms = db.rooms.filter(r => r.id !== id);
    const devices = db.domoticaControls.filter(d => d.roomId === id);
    for (const device of devices) {
        await deleteDomoticaControl(device.id);
    }
}
export async function updateRoom(updatedRoom: Room): Promise<Room> {
    const index = db.rooms.findIndex(r => r.id === updatedRoom.id);
    if (index === -1) {
        throw new Error(`Room with id ${updatedRoom.id} not found`);
    }
    db.rooms[index] = { ...updatedRoom };
    return db.rooms[index];
}