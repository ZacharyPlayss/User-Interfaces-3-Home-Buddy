import type {DomoticaControl} from "../../model/DomoticaControl.ts";
import {Button, CardContent, Stack, Typography} from "@mui/material";
import {LightControls} from "./light/LightControls.tsx";
import {HeaterControls} from "./heater/HeaterControls.tsx";
import {LockControls} from "./lock/LockControls.tsx";
import {AudioControls} from "./audio/AudioControl.tsx";
import {useState} from "react";
import {ConfirmationDialog} from "../dialogs/ConfirmationDialog.tsx";
import {useActiveScene} from "../../hooks/data/get/single/useActiveScene.tsx";
import {useInterruptActiveAutomation} from "../../hooks/useInterruptActiveAutomation.tsx";
import {SceneInControlSvg} from "../svg/SceneInControlSvg.tsx";

interface DeviceControlsProps {
    domoticaControl: DomoticaControl
}

export function DeviceControls({domoticaControl}: DeviceControlsProps) {
    const {interruptActiveScene} = useInterruptActiveAutomation();
    const {activeScene} = useActiveScene();
    const [isConfirmationOpen, setConfirmationOpen] = useState(false);
    const sceneHasControl: boolean =
        activeScene?.controls.some(control => control.id === domoticaControl.id) ?? false;

    function handleSceneOverwrite() {
        interruptActiveScene()
    }

    return (
        !sceneHasControl ? (
            <CardContent
                sx={{
                    position: "relative"
            }}
            >
                {domoticaControl.type === "licht" && (
                    <LightControls control={domoticaControl}/>
                )}
                {domoticaControl.type === "verwarming" && (
                    <HeaterControls control={domoticaControl}/>
                )}
                {domoticaControl.type === "deurslot" && (
                    <LockControls control={domoticaControl}/>
                )}
                {domoticaControl.type === "audio" && (
                    <AudioControls control={domoticaControl}/>
                )}
            </CardContent>
        ) : (<>
                <CardContent
                    sx={{
                        position: "relative",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <SceneInControlSvg/>
                    <Stack direction={"column"}
                           justifyContent={"center"}>
                        <Typography variant={"h4"} sx={{mt:2}}>
                            Scene in controle
                        </Typography>
                        <Typography>
                            De actieve scene regelt dit apparaat voor je. Wil je zelf de controle nemen?
                        </Typography>
                        <Button
                            sx={{marginTop: 2}}
                            variant={"contained"}
                            onClick={() => setConfirmationOpen(true)}
                        >
                            Controle overnemen
                        </Button>
                    </Stack>
                </CardContent>
                <ConfirmationDialog
                    isOpen={isConfirmationOpen}
                    onAccept={handleSceneOverwrite}
                    onClose={() => setConfirmationOpen(false)}
                    confirmationMessage={"Ben je zeker dat je de controle wilt overnemen?"}
                    confirmationDescription={"Dit zal de huidige scene deactiveren."}
                />
            </>
        )
    );
}