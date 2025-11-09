import type {DomoticaControlAudio, DomoticaControlHeater, DomoticaControlLightType, DomoticaControlLock} from "./DomoticaControlValueTypes.ts";

export type DomoticaControl =
    | ({ type: "licht"; value: DomoticaControlLightType; defaultValue: DomoticaControlLightType } & CommonProps)
    | ({ type: "verwarming"; value: DomoticaControlHeater;defaultValue: DomoticaControlHeater } & CommonProps)
    | ({ type: "deurslot"; value: DomoticaControlLock;defaultValue: DomoticaControlLock } & CommonProps)
    | ({ type: "audio"; value: DomoticaControlAudio;defaultValue: DomoticaControlAudio } & CommonProps);

type CommonProps = {
    id: string;
    name: string;
    upcCode: string;
    x: number;
    y: number;
    description?: string;
    roomId: string;
};

export type DomoticaControlWithoutId = Omit<DomoticaControl, 'id'>
export type DomoticaControlWithoutIdOrValues = Omit<DomoticaControl, 'id' | 'defaultValue' | 'value'>
export type DomoticaControlWithoutValues = Omit<DomoticaControl, 'defaultValue' | 'value'>

//SPECIFIC CONTROLS BASED ON THE UNION
export type LightControl = Extract<DomoticaControl, { type:"licht" }>
export type HeaterControl = Extract<DomoticaControl, { type:"verwarming" }>
export type LockControl = Extract<DomoticaControl, { type:"deurslot" }>
export type AudioControl = Extract<DomoticaControl, { type:"audio" }>
