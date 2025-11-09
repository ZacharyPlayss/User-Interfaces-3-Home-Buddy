import type {LockControl} from "../../../model/DomoticaControl.ts";
import {Stack, Switch, Typography} from "@mui/material";
import {useUpdateDomoticaControl} from "../../../hooks/data/update/useUpdateDomoticaControl.tsx";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import {LockSvg} from "../../svg/LockSvg.tsx";
import {useSyncedState} from "../../../hooks/useSyncedState.tsx";

interface LockControlsProps{
    control:LockControl
}

export function LockControls({ control }: LockControlsProps) {
    const { updateDomoticaControl } = useUpdateDomoticaControl();
    const [lockedState, setLockedState] = useSyncedState<string>({initialValue: control.value.open_closed});

    const handleToggle = () => {
        const newState: "open" | "closed" =
            lockedState === "open" ? "closed" : "open";
        setLockedState(newState);

        const updatedControl = {
            ...control,
            value: {
                ...control.value,
                open_closed: newState,
            },
        };
        updateDomoticaControl(updatedControl);
    };

    const isOpen = lockedState === "open";

    return (
        <>
            <div
            style={{
                position:"relative",
                width:"100%",
                marginTop:"-25%",
                transform:"scale(60%)",
                pointerEvents:"none"
            }}>
                <LockSvg isOpen={isOpen}/>
            </div>
            <Stack spacing={1} sx={{ mt: -5, alignItems: 'flex-start' }}>
                <Typography gutterBottom variant="h5">
                    {control.name}
                </Typography>
                <Typography>
                    open/gesloten: {isOpen ? "open" : "gesloten"}
                </Typography>
                <Stack direction="row" alignItems="center" spacing={1}>
                    <LockIcon color={isOpen ? "disabled" : "action"} />
                    <Switch
                        checked={isOpen}
                        onChange={handleToggle}
                    />
                    <LockOpenIcon color={isOpen ? "action" : "disabled"} />
                </Stack>
            </Stack>
        </>
    );
}