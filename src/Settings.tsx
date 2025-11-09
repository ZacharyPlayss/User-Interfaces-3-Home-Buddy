import {Stack, Typography} from "@mui/material";
import {ThemeColorControlsHorizontal} from "./components/ThemeColorControlsHorizontal.tsx";
import {AuthenticationButtons} from "./components/AuthenticationButtons.tsx";
import {FloorPlanViewerControls} from "./components/FloorPlanViewerControls.tsx"

export function Settings() {
    return (
        <>
            <Typography variant={"h4"}>
                Instellingen
            </Typography>
            <Stack spacing={1}
                   sx={{mt: 1}}
                   direction={"column"}>
                <Typography>
                    Voorkeuren
                </Typography>
                <ThemeColorControlsHorizontal/>
            </Stack>
            <Stack spacing={1}
                   sx={{mt: 1}}
                   direction={"column"}>
                <Typography>
                    Vloerplan weergave
                </Typography>
                <FloorPlanViewerControls/>
            </Stack>

            <AuthenticationButtons direction={"column"}/>
            </>
    );
}

export default Settings;