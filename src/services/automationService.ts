import type { Automation, AutomationWithoutId } from "../model/Automation.ts";
import { disableScene, getScene, updateScene } from "./sceneService.ts";
import {db, DB_LIMITS} from "./in_memory_db/db.ts";

export async function getAllAutomations(): Promise<Automation[]> {
    return [...db.automations];
}

export async function getAutomation(id: string): Promise<Automation> {
    const automation = db.automations.find(a => a.id === id);
    if (!automation) throw new Error(`Automation with id ${id} not found`);
    return automation;
}

export async function getAutomationsBySceneId(id: string): Promise<Automation[]> {
    return db.automations.filter(a => a.sceneId === id);
}

export async function getActiveAutomations(): Promise<Automation[]> {
    return db.automations.filter(a => a.enabled === true);
}

export async function addAutomation(automation: AutomationWithoutId): Promise<Automation> {
    if (db.automations.length >= DB_LIMITS.AUTOMATIONS) {
        throw new Error(`Database limit reached: Cannot exceed ${DB_LIMITS.AUTOMATIONS} automations.`);
    }

    const newAutomation: Automation = {
        ...automation,
        id: Math.random().toString(36).substring(2, 9)
    };

    db.automations.push(newAutomation);
    return newAutomation;
}

export async function updateAutomation(updatedAutomation: Automation): Promise<Automation> {
    const index = db.automations.findIndex(a => a.id === updatedAutomation.id);
    if (index === -1) throw new Error("Automation not found");

    db.automations[index] = { ...updatedAutomation };
    return db.automations[index];
}

export async function enableAutomation(automationId: string) {
    const automation = await getAutomation(automationId);
    const updatedAutomation = await updateAutomation({ ...automation, enabled: true });
    const scene = await getScene(updatedAutomation.sceneId);
    if (!scene || !scene.id) {
        throw new Error(`Scene with id ${updatedAutomation.sceneId} not found`);
    }
    await updateScene({ ...scene, id: scene.id, enabled: true });

    return updatedAutomation;
}
export async function disableAutomation(automationId: string) {
    const automation = await getAutomation(automationId);
    const updatedAutomation = await updateAutomation({ ...automation, enabled: false });
    const scene = await getScene(updatedAutomation.sceneId);
    if (!scene || !scene.id) {
        throw new Error(`Scene with id ${updatedAutomation.sceneId} not found`);
    }
    await updateScene({ ...scene, id: scene.id, enabled: false });
    return updatedAutomation;
}

export async function resetActiveAutomations() {
    const automations = await getActiveAutomations();
    const updates = automations.map(async (automation) => {
        await disableScene();
        return updateAutomation({ ...automation, enabled: false, isInterrupted: false });
    });
    return Promise.all(updates);
}

export async function interruptActiveAutomation() {
    const automations = await getActiveAutomations();
    await disableScene();
    const updates = automations.map(async (automation) => {
        return updateAutomation({ ...automation, isInterrupted: true });
    });
    return Promise.all(updates);
}

export async function deleteAutomation(id: string) {
    db.automations = db.automations.filter(a => a.id !== id);
}

export async function deleteAutomationBySceneId(sceneId: string) {
    db.automations = db.automations.filter(a => a.sceneId !== sceneId);
}