import {Box, Button, Card, Typography, useMediaQuery} from "@mui/material";
import {FloorplanErrorSvg} from "../../svg/FloorplanErrorSvg.tsx";
import {theme} from "../../../config/theme/theme.ts";
import type {FallbackProps} from "react-error-boundary";

export function FloorPlanErrorFallback({error, resetErrorBoundary}: FallbackProps){
    const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
    const errorCode = error.status ?? null;

    return(
        <Box
            sx={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Card
                sx={{
                    width: isMediumScreen? "85svw" : "80svw",
                    height: isMediumScreen? "90svh" :"70svh",
                    display: "flex",
                    borderRadius: 4,
                    boxShadow: 6,
                    flexDirection: isMediumScreen ? "column" : "row",
                    maxWidth: 1250
                }}
            >
                <Box
                    sx={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        p: 4,
                        textAlign: "left",
                    }}
                >
                    <Typography sx={{textAlign:"center",fontWeight:"bold", fontSize:140, mb:-2, color:theme.palette.primary.main}} gutterBottom>
                        {errorCode}
                    </Typography>
                    <Typography variant="h4" gutterBottom>
                        Kleine koffievlek op het vloerplan...
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Even opdrogen en opnieuw proberen?
                    </Typography>
                    <Button
                        variant={"outlined"}
                        sx={{m: 1}}
                        onClick={resetErrorBoundary}
                    >
                        Opnieuw proberen
                    </Button>
                </Box>

                <Box
                    sx={{
                        flex: 1,
                        pointerEvents:"none",
                        alignContent:"end",
                        m:8
                    }}
                >
                    <FloorplanErrorSvg/>
                </Box>
            </Card>
        </Box>
    )
}