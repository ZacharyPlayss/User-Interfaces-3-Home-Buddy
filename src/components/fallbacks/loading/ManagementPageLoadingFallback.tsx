import {Box, Skeleton, Stack} from "@mui/material";
import {useMediaQueries} from "../../../hooks/useMediaQueries.tsx";

export function ManagementPageLoadingFallback() {
    const {isSmallScreen} = useMediaQueries();

    return (
        <Box sx={{p: 3, mt: 6, position: "relative", height: "90vh"}}>
            <Stack
                spacing={2}
                direction={isSmallScreen ? "column" : "row"}
                sx={{height: "100%"}}
            >
                {isSmallScreen ? (
                    <>
                        <Skeleton sx={{mt: 8, p: 2, minWidth: 350}}/>
                    </>
                ) : (
                    <>
                        <Skeleton sx={{mt: 8, p: 2, minWidth: 350}}/>
                    </>
                )}
            </Stack>
        </Box>
    );
}
