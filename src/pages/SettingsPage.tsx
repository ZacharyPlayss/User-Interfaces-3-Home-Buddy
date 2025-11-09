import {Box, Card, Stack} from "@mui/material";
import Settings from "../Settings.tsx";

export function SettingsPage() {
    return (
        <>
            <Box sx={{p: 3, mt: 6, position: "relative"}}>
                <Stack spacing={2}
                       direction={"row"}>
                    <Card sx={{mt: 8, p: 2, minWidth: 350}}>
                        <Settings/>
                    </Card>
                </Stack>
            </Box>
        </>
    );
}