import axios from "axios";
import type {Scene, SceneWithoutId} from "../model/Scene.ts";
import {resetDomoticaControlValues} from "./domoticaControlService.ts";
import {deleteAutomationBySceneId, getAutomationsBySceneId} from "./automationService.ts";

export async function getScene(id: string){
    const {data:scene} = await axios.get<Scene>(`/scenes/${id}`)
    return scene;
}
export async function getActiveScenes(){
    const {data:scenes} = await axios.get<Scene[]>(`/scenes?enabled=true`)
    return scenes;
}
export async function getAllScenes(){
    const {data: scenes} = await axios.get<Scene[]>(`/scenes`)
    return scenes
}
export async function addScene(scene:SceneWithoutId){
    const {data: newScene} = await axios.post<Scene>('/scenes', scene)
    return newScene
}
export async function updateScene(updatedScene: Scene){
    const {data} = await axios.patch<Scene>(`/scenes/${updatedScene.id}`,{
        ...updatedScene
    });
    return data;
}
export async function disableScene(){
    const scenes = await getActiveScenes();
    scenes.forEach((scene) => {
        updateScene({...scene, enabled:false});
        scene.controls.forEach((control) => {
            resetDomoticaControlValues(control.id);
        })
    })

    const updates = scenes.map(scene =>
        updateScene({...scene, enabled:false})
    );
    return await Promise.all(updates);
}

//Client side filtered due to json-server usage.
export async function getScenesByControlId(controlId: string): Promise<Scene[]> {
    const allScenes = await getAllScenes();
    return allScenes.filter(scene =>
        scene.controls.some(control => control.id === controlId)
    );
}

export async function deleteScene(id: string){
    await axios.delete(`/scenes/${id}`)
    const attachedAutomations = await getAutomationsBySceneId(id);
    if(attachedAutomations.length != 0){
        await deleteAutomationBySceneId(id);
    }
}