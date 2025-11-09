import {Box, Skeleton, Stack} from "@mui/material";
import {Carousel} from "../../Caroussel.tsx";
import {useMediaQueries} from "../../../hooks/useMediaQueries.tsx";

export function DashboardBottomCardsLoadingFallback() {
    const {isSmallScreen} = useMediaQueries();
    return (
        <Box sx={{
            position: "absolute",
            left: 0,
            bottom: 0,
            zIndex: 1,
            width: "100%",
        }}>
            {isSmallScreen &&
                <Carousel>
                    <Skeleton
                        id={"mostUsedScenesCardPlaceholder"}
                        variant={"rectangular"}
                        sx={{minWidth: 250, height: 200}}  // height added
                        width={"100%"}
                    />
                    <Skeleton
                        id={"upcommingAutomationsCardPlaceholder"}
                        variant={"rectangular"}
                        sx={{minWidth: 250, height: 200}}  // height added
                        width={"100%"}
                    />
                </Carousel>
            }
            {!isSmallScreen &&

                <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                        flexGrow: 1,
                        maxHeight: "45%",
                        position: "relative",
                        width: '100%',
                    }}
                >
                    <Skeleton
                        id={"mostUsedScenesCardPlaceholder"}
                        sx={{ flex: 1, minHeight: 400, width: '100%' }}
                    />
                    <Skeleton
                        id={"upcommingAutomationsCardPlaceholder"}
                        sx={{ flex: 1, minHeight: 400, width: '100%' }}
                    />
                </Stack>
            }
        </Box>
    )
}