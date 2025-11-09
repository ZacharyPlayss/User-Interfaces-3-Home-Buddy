import {IconButton, Stack} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

interface FloorPlanNavigationProps{
    onNextFloor: () => void,
    onPreviousFloor: () => void
    currentFloorIndex: number,
    floorsLength: number
}

export function FloorPlanNavigation({onNextFloor,onPreviousFloor,currentFloorIndex,floorsLength,}: FloorPlanNavigationProps) {
    return <Stack direction={"row"}>
        <IconButton
            size="large"
            onClick={onNextFloor}
            disabled={currentFloorIndex >= floorsLength - 1}
        >
            <ArrowUpwardIcon/>
        </IconButton>
        <IconButton
            size="large"
            onClick={onPreviousFloor}
            disabled={currentFloorIndex <= 0}
        >
            <ArrowDownwardIcon/>
        </IconButton>
    </Stack>;
}