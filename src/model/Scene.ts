import type {DomoticaControl} from "./DomoticaControl.ts";
import type {DomoticaControlAudio, DomoticaControlHeater, DomoticaControlLightType, DomoticaControlLock} from "./DomoticaControlValueTypes.ts";

export type Scene={
    id:string,
    name:string,
    description?:string;
    enabled: boolean;
    isGlobal:boolean;
    image?:string;
    controls:SceneControlValue[]
}
export type SceneControlValue ={
    id: DomoticaControl['id'];
    controlType: DomoticaControl['type']
    value: DomoticaControlLightType | DomoticaControlHeater | DomoticaControlLock | DomoticaControlAudio
}

export type SceneWithoutId = Omit<Scene, "id">