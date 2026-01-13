import type { DomoticaControl, DomoticaControlWithoutIdOrValues } from "../model/DomoticaControl.ts";
import { deleteScene, getScenesByControlId, updateScene } from "./sceneService.ts";
import {db, DB_LIMITS, generateId} from "./in_memory_db/db.ts";

export async function getDomoticaControl(id: string) {
    return db.domoticaControls.find(c => c.id === id);
}

export async function getAllDomoticaControls(){
    return db.domoticaControls;
}

export async function getAllDomoticaControlsForRoom(roomId: string) {
    return db.domoticaControls.filter(c => c.roomId === roomId);
}

export async function addDomoticaControl(control: DomoticaControlWithoutIdOrValues) {
    if (db.domoticaControls.length >= DB_LIMITS.CONTROLS) throw new Error("Limit reached");
    const newControl = { ...control, id: generateId(), value: (control as any).defaultValue } as DomoticaControl;
    db.domoticaControls.push(newControl);
    return newControl;
}

export async function resetDomoticaControlValues(id: string) {
    const control = await getDomoticaControl(id);
    if (!control) throw new Error(`Control ${id} not found`);
    return await updateDomoticaControlValues(id, control.defaultValue);
}

export async function updateDomoticaControlValues(id: string, value: any) {
    const control = db.domoticaControls.find(c => c.id === id);
    if (control) control.value = value;
    return control;
}

export async function deleteDomoticaControl(id: string) {
    db.domoticaControls = db.domoticaControls.filter(c => c.id !== id);
    const attachedScenes = await getScenesByControlId(id);
    for (const scene of attachedScenes) {
        if (scene.controls.length > 1) {
            await updateScene({ ...scene, controls: scene.controls.filter(c => c.id !== id) });
        } else {
            await deleteScene(scene.id);
        }
    }
}

export async function roomIncludesAudioDomoticaControl(
    roomId: string,
    options?: { excludeControl?: boolean, domoticaControlId?: string }
): Promise<boolean> {
    return db.domoticaControls.some(c =>
        c.roomId === roomId &&
        c.type === "audio" &&
        (options?.excludeControl ? c.id !== options.domoticaControlId : true)
    );
}

export async function roomIncludesHeaterDomoticaControl(
    roomId: string,
    options?: { excludeControl?: boolean, domoticaControlId?: string }
): Promise<boolean> {
    return db.domoticaControls.some(c =>
        c.roomId === roomId &&
        c.type === "verwarming" &&
        (options?.excludeControl ? c.id !== options.domoticaControlId : true)
    );
}
export async function updateDomoticaControl(updatedControl: DomoticaControl) {
    const index = db.domoticaControls.findIndex(c => c.id === updatedControl.id);
    if (index === -1) {
        throw new Error(`Control with id ${updatedControl.id} not found`);
    }
    db.domoticaControls[index] = { ...updatedControl };

    return db.domoticaControls[index];
}