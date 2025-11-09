import { ToggleButton,Typography, ToggleButtonGroup, Tooltip} from "@mui/material";
import {useFloorPlanSettings} from "../hooks/useFloorPlanSettings.tsx";

export function FloorPlanViewerControls(){
    const {currentSetting, setCurrentSetting} = useFloorPlanSettings();

    return(
        <>
            <ToggleButtonGroup
                value={currentSetting}
                exclusive
                onChange={(_, newValue) => {
                    if (newValue !== null) setCurrentSetting(newValue);
                }}
                size="small"
            >
                <Tooltip title="3D">
                    <ToggleButton value="3D"
                                  aria-label="light mode">
                        <Typography sx={{fontWeight:"bold"}}>
                            3D
                        </Typography>
                    </ToggleButton>
                </Tooltip>
                <Tooltip title="2D">
                    <ToggleButton value="2D"
                                  aria-label="system mode">
                        <Typography sx={{fontWeight:"bold"}}>
                            2D
                        </Typography>
                    </ToggleButton>
                </Tooltip>

            </ToggleButtonGroup>
        </>
    )
}