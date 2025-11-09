import type {LightControl} from "../../../model/DomoticaControl.ts";
import {Button, Slider, Stack, Typography} from "@mui/material";
import {useUpdateDomoticaControl} from "../../../hooks/data/update/useUpdateDomoticaControl.tsx";
import {LampSvg} from "../../svg/LampSvg.tsx";
import {useMediaQueries} from "../../../hooks/useMediaQueries.tsx";
import {useSyncedState} from "../../../hooks/useSyncedState.tsx";

interface LightControlsProps {
    control: LightControl
}
export function LightControls({control}: LightControlsProps) {
    const {isSmallScreen} = useMediaQueries();
    const {updateDomoticaControl} = useUpdateDomoticaControl();
    const [isOn, setIsOn] = useSyncedState<string>({initialValue: control.value.on_off});
    const [brightness, setBrightness] = useSyncedState<number>({initialValue:control.value.brightness});

    function handleClick() {
        const newState: "on" | "off" = isOn === "on" ? "off" : "on";
        setIsOn(newState);

        const updatedControl = {
            ...control,
            value: {
                ...control.value,
                on_off: newState,
            },
        };
        updateDomoticaControl(updatedControl);
    }
    function handleBlur() {
        updateDomoticaControl({
            ...control,
            value: {...control.value, brightness},
        });
    }

    return (
        <>
            <div
                style={{
                    position:"relative",
                    marginTop:"-10%",
                    left:isSmallScreen?"12.5%":0,
                    width:isSmallScreen?"75%":"100%",
                    pointerEvents:"none"
                }}
            >
                <LampSvg isOn={isOn === "on"} brightness={brightness * 0.01}/>
            </div>

            <Stack spacing={1}
                   sx={{mt: -12}}>
                <Typography gutterBottom
                            variant="h5">
                    {control.name}
                </Typography>
                <Typography>Aan/uit: {isOn ==="on" ?"aan":"uit"}</Typography>
                <Button variant="contained"
                        onClick={handleClick}>
                    Licht aan/uit
                </Button>
                <Typography>Helderheid: {brightness}%</Typography>
                <Slider
                    value={brightness}
                    onChange={(_, newValue) => setBrightness(newValue as number)}
                    onBlur={handleBlur}
                    aria-label="brightness-slider"
                />
            </Stack>
        </>
    );
}
