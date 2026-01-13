import type { Automation } from "../../model/Automation.ts";
import type { DomoticaControl } from "../../model/DomoticaControl.ts";
import type { Floor } from "../../model/Floor.ts";
import type { Room } from "../../model/Room.ts";
import type { Scene } from "../../model/Scene.ts";

export const DB_LIMITS = {
    AUTOMATIONS: 5,
    CONTROLS: 5,
    ROOMS: 5,
    FLOORS: 5,
    SCENES: 5
};

export const generateId = () => Math.random().toString(36).substring(2, 9);

const defaultFloorId = generateId();
const defaultRoomId = generateId();
const defaultControlId = generateId();
const defaultSceneId = generateId();

export const db = {
    automations: [
        {
            id: generateId(),
            start: new Date(),
            end: new Date(Date.now() + 3600000), // 1 hour from now
            sceneId: defaultSceneId,
            enabled: true,
            isInterrupted: false
        }
    ] as Automation[],

    domoticaControls: [
        {
            id: defaultControlId,
            type: "licht",
            name: "Main Ceiling Light",
            upcCode: "LP-100-W",
            x: 0,
            y: 0,
            description: "Dimmable living room light",
            roomId: defaultRoomId,
            value: 80 as any,
            defaultValue: 0 as any
        }
    ] as DomoticaControl[],

    floors: [
        {
            id: defaultFloorId,
            name: "Ground Floor",
            description: "Main floor with living area and kitchen",
            width: 15,
            height: 8,
            x: 0,
            y: 0,
            level: 0
        }
    ] as Floor[],

    rooms: [
        {
            id: defaultRoomId,
            name: "Living Room",
            description: "Primary relaxation area",
            width: 10,
            height: 8,
            x: 0,
            y: 0,
            floorId: defaultFloorId
        }
    ] as Room[],

    scenes: [
        {
            id: defaultSceneId,
            name: "Movie Mode",
            description: "Dim lights and secure doors",
            enabled: true,
            isGlobal: false,
            controls: [
                {
                    id: defaultControlId,
                    controlType: "licht",
                    value: 10 as any,
                }
            ]
        }
    ] as Scene[]
};