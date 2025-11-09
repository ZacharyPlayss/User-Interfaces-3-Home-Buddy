import {Button, Stack} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface AddEntityControlsProps {
    onAddFloor: () => void,
    onAddRoom: () => void,
    onAddDevice: () => void,
    floorCount: number
}

export function AddEntityControls({onAddFloor, onAddRoom, onAddDevice, floorCount}: AddEntityControlsProps) {
    return (
        <>
            <Stack>
                <Button
                    variant="contained"
                    startIcon={<AddIcon/>}
                    onClick={onAddFloor}
                    sx={{mt: 1}}
                >
                    Verdieping toevoegen
                </Button>
                <Button
                    variant="contained"
                    startIcon={<AddIcon/>}
                    onClick={onAddRoom}
                    sx={{mt: 1}}
                    disabled={floorCount === 0}
                >
                    Kamer toevoegen
                </Button>
                <Button
                    variant="contained"
                    startIcon={<AddIcon/>}
                    onClick={onAddDevice}
                    sx={{mt: 1}}
                    disabled={floorCount === 0}
                >
                    Apparaat toevoegen
                </Button>
            </Stack>
        </>
    )
}
