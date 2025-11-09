import {Card, CardContent, Typography} from "@mui/material";
import type {SceneControlValue} from "../../model/Scene.ts";
import type {DomoticaControlAudio, DomoticaControlHeater, DomoticaControlLightType, DomoticaControlLock} from "../../model/DomoticaControlValueTypes.ts";
import {domoticaControlTypeIconMap} from "../../model/DomoticaControlTypes.ts";
import {useDomoticaControl} from "../../hooks/data/get/single/useDomoticaControl.tsx";

interface SceneControlPreviewCardProps {
    controlValue: SceneControlValue
}

export function SceneControlPreviewCard({controlValue}: SceneControlPreviewCardProps) {
    const IconComponent = domoticaControlTypeIconMap[controlValue.controlType];

    return (
        <>
            <Card sx={{ display: 'flex', flexDirection: 'row', mt: 2, alignItems: 'center' }}>
                <IconComponent sx={{ml:2}}/>
                <SceneControlCardContent sceneControlValue={controlValue} />
            </Card>
        </>
    )
}

interface SceneControlCardContentProps {
    sceneControlValue: SceneControlValue
}
function SceneControlCardContent({sceneControlValue}:SceneControlCardContentProps){
    const {domoticaControl} = useDomoticaControl(sceneControlValue.id);
    return (
        <>
            <CardContent sx={{flex: '1 0 auto'}}>
                <Typography fontWeight={"bold"}>
                    {domoticaControl.name}
                </Typography>
                {sceneControlValue.controlType === "licht" && (() => {
                    const value = sceneControlValue.value as DomoticaControlLightType;
                    return (
                        <>
                            <Typography>
                                Aan/uit: {value.on_off === "on"? "aan":"uit"}
                            </Typography>
                            <Typography>
                                Helderheid: {value.brightness}%
                            </Typography>
                        </>
                    );
                })()}
                {sceneControlValue.controlType === "verwarming" && (() => {
                    const value = sceneControlValue.value as DomoticaControlHeater;
                    return (
                        <>
                            <Typography>
                                Temperatuur: {value.temperature}°C
                            </Typography>
                        </>
                    );
                })()}
                {sceneControlValue.controlType === "deurslot" && (() => {
                    const value = sceneControlValue.value as DomoticaControlLock;
                    return (
                        <>
                            <Typography>
                                open/closed: {value.open_closed === "open"? "open":"gesloten"}
                            </Typography>
                        </>
                    );
                })()}
                {sceneControlValue.controlType === "audio" && (() => {
                    const value = sceneControlValue.value as DomoticaControlAudio;
                    return (
                        <>
                            <Typography>
                                Volume: {value.volume} %
                            </Typography>
                            <Typography>
                                Afspeellijst: {value.playlist}
                            </Typography>
                        </>
                    );
                })()}
            </CardContent>
        </>
    )
}