import type {DomoticaControl, DomoticaControlWithoutIdOrValues, DomoticaControlWithoutValues} from "../model/DomoticaControl.ts";
import axios from "axios";
import {deleteScene, getScenesByControlId, updateScene} from "./sceneService.ts";

export async function getDomoticaControl(id: string){
    const {data:domoticaControl} = await axios.get<DomoticaControl>(`/domoticaControls/${id}`)
    return domoticaControl;
}
export async function getAllDomoticaControlsForRoom(roomId: string) {
    const { data: controls } = await axios.get<DomoticaControl[]>(`/domoticaControls?roomId=${roomId}`);
    return controls;
}
export async function getAllDomoticaControls(){
    const {data: controls} = await axios.get<DomoticaControl[]>(`/domoticaControls`)
    return controls
}
export async function addDomoticaControl(domoticaControl:DomoticaControlWithoutIdOrValues){
    const {data: newDomoticaControl} = await axios.post<DomoticaControlWithoutIdOrValues>('/domoticaControls', domoticaControl)
    return newDomoticaControl
}
export async function updateDomoticaControl(updatedDomoticaControl: DomoticaControl){
    const {data} = await axios.patch<DomoticaControlWithoutValues>(`/domoticaControls/${updatedDomoticaControl.id}`,{
        ...updatedDomoticaControl
    });
    return data;
}

export async function resetDomoticaControlValues(id:string){
    const domoticaControl = await getDomoticaControl(id);
    return await updateDomoticaControlValues(domoticaControl.id, domoticaControl.defaultValue);
}

export async function updateDomoticaControlValues(id: string, value: DomoticaControl['value']) {
    const { data } = await axios.patch<DomoticaControl>(`/domoticaControls/${id}`, {
        value:value,
    });
    return data;
}
export async function deleteDomoticaControl(id: string) {
    await axios.delete(`/domoticaControls/${id}`)
    const attachedScenes = await getScenesByControlId(id);
    if (attachedScenes.length !== 0) {
        const promises = attachedScenes.map(scene => {
            if (scene.controls.length > 1) {
                return updateScene({
                    ...scene,
                    controls: scene.controls.filter(control => control.id !== id),
                });
            } else {
                return deleteScene(scene.id);
            }
        });

        await Promise.all(promises);
    }
}

type ExclusionOptions={
    domoticaControlId?: string;
    excludeControl?:boolean;
}

export async function roomIncludesAudioDomoticaControl(roomId: string, options?:ExclusionOptions) {
    let controls = await getAllDomoticaControlsForRoom(roomId);
    if(options &&  options.excludeControl){
       controls = controls.filter((control) => control.id != options.domoticaControlId);
    }
    return controls.some(control => control.type === "audio");
}
export async function roomIncludesHeaterDomoticaControl(roomId: string,options?:ExclusionOptions) {
    let controls = await getAllDomoticaControlsForRoom(roomId);
    if(options && options.excludeControl){
        controls = controls.filter((control) => control.id != options.domoticaControlId);
    }
    return controls.some(control => control.type === "verwarming");
}