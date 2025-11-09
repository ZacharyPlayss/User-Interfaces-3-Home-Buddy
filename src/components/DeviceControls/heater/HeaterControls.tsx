import type {HeaterControl} from "../../../model/DomoticaControl.ts";
import {Slider, Stack, Typography} from "@mui/material";
import {useUpdateDomoticaControl} from "../../../hooks/data/update/useUpdateDomoticaControl.tsx";
import {ThermostatSvg} from "../../svg/ThermostatSvg.tsx";
import {useSyncedState} from "../../../hooks/useSyncedState.tsx";

interface HeaterControlsProps{
    control:HeaterControl
}

export function HeaterControls({control}: HeaterControlsProps) {
    const { updateDomoticaControl } = useUpdateDomoticaControl();
    const [temperature, setTemperature] = useSyncedState<number>({initialValue: control.value.temperature});

    function handleBlur() {
        updateDomoticaControl({
            ...control,
            value: { ...control.value, temperature },
        });
    }

    return (
        <>
            <div style={{
                position:"relative",
                width:"100%",
                pointerEvents:"none",
                marginTop:0
            }}>
                <ThermostatSvg temperature={temperature}/>
            </div>

            <Stack spacing={1} sx={{ mt: 2, alignItems: 'flex-start' }}>
                <Typography gutterBottom variant="h5">
                    {control.name}
                </Typography>
                <Slider
                    min={10}
                    max={30}
                    value={temperature}
                    onChange={(_, newValue) => setTemperature(newValue as number)}
                    onBlur={handleBlur}
                    aria-label="brightness-slider"
                />
            </Stack>
        </>
    )
}