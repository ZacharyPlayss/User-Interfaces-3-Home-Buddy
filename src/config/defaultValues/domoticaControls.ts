import type {DomoticaControlAudio, DomoticaControlHeater, DomoticaControlLightType, DomoticaControlLock} from "../../model/DomoticaControlValueTypes.ts";

export const domoticaControlTypeDefaultValues: {
    licht: DomoticaControlLightType;
    verwarming: DomoticaControlHeater;
    deurslot: DomoticaControlLock;
    audio: DomoticaControlAudio;
} = {
    licht: {
        on_off: "off",
        brightness: 100,
    },
    verwarming: {
        temperature: 16,
    },
    deurslot: {
        open_closed: "closed"
    },
    audio: {
        playlist: "classic",
        volume: 0,
    },
};