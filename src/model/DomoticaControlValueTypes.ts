export type DomoticaControlLightType = {
    on_off:"on"|"off"
    brightness:number
}
export type DomoticaControlHeater ={
    temperature:number
}
export type DomoticaControlLock = {
    open_closed: "open"|"closed"
}
export type DomoticaControlAudio ={
    playlist:string
    volume:number
}
export type DomoticaControlValueType = DomoticaControlLightType | DomoticaControlHeater | DomoticaControlLock | DomoticaControlAudio
