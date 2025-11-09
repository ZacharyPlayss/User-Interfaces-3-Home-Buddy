import axios from "axios";
import type {Automation, AutomationWithoutId} from "../model/Automation.ts";
import {disableScene, getScene, updateScene} from "./sceneService.ts";

export async function getAutomation(id: string){
    const {data: automation} = await axios.get<Automation>(`/automations/${id}`)
    return automation
}
export async function getAutomationsBySceneId(id: string){
    const {data: automation} = await axios.get<Automation[]>(`/automations?sceneId=${id}`)
    return automation
}

export async function getActiveAutomations(){
    const {data:scenes} = await axios.get<Automation[]>(`/automations?enabled=true`)
    return scenes;
}

export async function getAllAutomations(){
    const {data: automations} = await axios.get<Automation[]>(`/automations`)
    return automations
}

export async function addAutomation(automation:AutomationWithoutId){
    const {data: newAutomation} = await axios.post<AutomationWithoutId>('/automations', automation)
    return newAutomation
}

export async function updateAutomation(updatedAutomation: Automation){
    const {data} = await axios.patch<Automation>(`/automations/${updatedAutomation.id}`,{
        ...updatedAutomation
    });
    return data;
}

export async function enableAutomation(automationId: string){
    const automation = await getAutomation(automationId);
    const updatedAutomation = await updateAutomation({...automation, enabled:true});
    const scene = await getScene(updatedAutomation.sceneId);
    await updateScene({...scene, enabled:true})
    return updatedAutomation;
}

export async function resetActiveAutomations(){
    const automations = await getActiveAutomations();
    const automationUpdates = automations.map(async (automation) => {
        await disableScene();
        return updateAutomation({ ...automation, enabled: false, isInterrupted:false });
    });
    return Promise.all(automationUpdates);
}

export async function interruptActiveAutomation(){
    const automations = await getActiveAutomations();
    await disableScene();
    const automationUpdates = automations.map(async (automation) => {
        return updateAutomation({...automation,isInterrupted:true})
    });
    return Promise.all(automationUpdates);
}

export async function disableAutomation(){
    const automations = await getActiveAutomations();
    const automationUpdates = automations.map(async (automation) => {
        await disableScene();
        return updateAutomation({ ...automation, enabled: false });
    });
    return Promise.all(automationUpdates);
}

export async function deleteAutomation(id: string){
    await axios.delete(`/automations/${id}`)
}
export async function deleteAutomationBySceneId(sceneId: string) {
    const automations = await getAutomationsBySceneId(sceneId);

    await Promise.all(
        automations.map((automation: Automation) =>
            axios.delete(`/automations/${automation.id}`)
        )
    );
}