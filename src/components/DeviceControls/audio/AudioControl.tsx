import type {AudioControl} from "../../../model/DomoticaControl.ts";
import {Button, Slider, Stack, TextField, Typography} from "@mui/material";
import {useUpdateDomoticaControl} from "../../../hooks/data/update/useUpdateDomoticaControl.tsx";
import {RadioSvg} from "../../svg/RadioSvg.tsx";
import {useSyncedState} from "../../../hooks/useSyncedState.tsx";

interface AudioControlsProps{
    control:AudioControl
}

export function AudioControls({control}: AudioControlsProps) {
    const { updateDomoticaControl, isPending } = useUpdateDomoticaControl();
    const [volume, setVolume] = useSyncedState<number>({initialValue: control.value.volume})
    const [playlist, setPlaylist] = useSyncedState<string>({initialValue: control.value.playlist})

    function handleBlur() {
        updateDomoticaControl({
            ...control,
            value: { ...control.value, volume },
        });
    }

    function handleUpdate(){
        updateDomoticaControl({
            ...control,
            value: { ...control.value, playlist },
        });
    }

    return (
        <>
            <div
                style={{
                    position:"relative",
                    width:"100%",
                    marginTop:40,
                    transform: "scale(120%)",
                    pointerEvents:"none"
                }}
            >
                <RadioSvg volume={volume} playlist={playlist}/>
            </div>

            <Stack spacing={1} sx={{ mt: 8 }}>
                <Typography gutterBottom variant="h5">
                    {control.name}
                </Typography>
                <Typography>Volume: {volume}</Typography>
                <Typography>Afspeellijst: {playlist}</Typography>

                <Slider
                    value={volume}
                    onChange={(_, newValue) => setVolume(newValue as number)}
                    onBlur={handleBlur}
                    aria-label="brightness-slider"
                />
                <TextField
                    label="Afspeellijst"
                    value={playlist}
                    onChange={(e) => setPlaylist(e.target.value)}
                    variant="outlined"
                    fullWidth
                />

                {playlist !== control.value.playlist && (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleUpdate}
                        disabled={isPending}
                    >
                        {isPending ? "Updating..." : "Update"}
                    </Button>
                )}
            </Stack>
        </>
    )
}