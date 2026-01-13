import type {Floor, FloorWithoutId, FloorWithRooms} from "../model/Floor.ts";
import { deleteRoom } from "./roomService.ts";
import {db, DB_LIMITS, generateId} from "./in_memory_db/db.ts";

export async function getAllFloors() {
    return [...db.floors].sort((a, b) => a.level - b.level);
}

export async function getFloorWithRooms(id: string) {
    const floor = db.floors.find(f => f.id === id);
    if (!floor) return null;
    const rooms = db.rooms.filter(r => r.floorId === id);
    return { ...floor, rooms };
}

export async function getAllFloorsWithRooms() {
    const floors = await getAllFloors();
    return floors.map(floor => {
        const rooms = db.rooms.filter(r => r.floorId === floor.id);
        return { ...floor, rooms } as FloorWithRooms;
    });
}

export async function addFloor(floor: FloorWithoutId) {
    if (db.floors.length >= DB_LIMITS.FLOORS) throw new Error("Limit reached");
    const newFloor = { ...floor, id: generateId() } as Floor;
    db.floors.push(newFloor);
    return newFloor;
}

export async function deleteFloor(id: string) {
    db.floors = db.floors.filter(f => f.id !== id);
    const rooms = db.rooms.filter(r => r.floorId === id);
    for (const room of rooms) {
        await deleteRoom(room.id);
    }
}

export async function doesFloorExist(level: number): Promise<boolean> {
    return db.floors.some(f => f.level === level);
}

export async function updateFloor(updatedFloor: Floor): Promise<Floor> {
    const index = db.floors.findIndex(f => f.id === updatedFloor.id);
    if (index === -1) {
        throw new Error(`Floor with id ${updatedFloor.id} not found`);
    }
    const levelConflict = db.floors.some(
        f => f.level === updatedFloor.level && f.id !== updatedFloor.id
    );
    if (levelConflict) {
        throw new Error(`Level ${updatedFloor.level} is already occupied by another floor.`);
    }
    db.floors[index] = { ...updatedFloor };

    return db.floors[index];
}