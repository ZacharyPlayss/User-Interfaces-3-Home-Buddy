import type { Scene, SceneWithoutId } from "../model/Scene.ts";
import { deleteAutomationBySceneId, getAutomationsBySceneId } from "./automationService.ts";
import {db, DB_LIMITS, generateId} from "./in_memory_db/db.ts";
import {resetDomoticaControlValues} from "./domoticaControlService.ts";

export async function getScene(id: string): Promise<Scene | undefined> {
    return db.scenes.find(scene => scene.id === id);
}

export async function getActiveScenes(): Promise<Scene[]> {
    return db.scenes.filter(scene => scene.enabled === true);
}

export async function getAllScenes(): Promise<Scene[]> {
    return [...db.scenes];
}

export async function addScene(scene: SceneWithoutId): Promise<Scene> {
    if (db.scenes.length >= DB_LIMITS.SCENES) {
        throw new Error(`Database limit reached: Cannot exceed ${DB_LIMITS.SCENES} scenes.`);
    }

    const newScene: Scene = {
        ...scene,
        id: generateId()
    };

    db.scenes.push(newScene);
    return newScene;
}

export async function updateScene(updatedScene: Scene): Promise<Scene> {
    const index = db.scenes.findIndex(s => s.id === updatedScene.id);
    if (index === -1) {
        throw new Error(`Scene with id ${updatedScene.id} not found`);
    }

    db.scenes[index] = { ...updatedScene };
    return db.scenes[index];
}

export async function disableScene(): Promise<Scene[]> {
    const activeScenes = await getActiveScenes();

    const updates = activeScenes.map(async (scene) => {
        for (const control of scene.controls) {
            await resetDomoticaControlValues(control.id);
        }
        return updateScene({ ...scene, enabled: false });
    });

    return Promise.all(updates);
}

export async function getScenesByControlId(controlId: string): Promise<Scene[]> {
    return db.scenes.filter(scene =>
        scene.controls.some(control => control.id === controlId)
    );
}

export async function deleteScene(id: string): Promise<void> {
    const index = db.scenes.findIndex(s => s.id === id);
    if (index !== -1) {
        db.scenes.splice(index, 1);

        const attachedAutomations = await getAutomationsBySceneId(id);
        if (attachedAutomations.length !== 0) {
            await deleteAutomationBySceneId(id);
        }
    }
}