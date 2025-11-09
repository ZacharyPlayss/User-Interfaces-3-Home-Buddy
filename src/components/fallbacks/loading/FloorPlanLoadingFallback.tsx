import {Box} from "@mui/material";
import {FloorPlanLoadingSvg} from "../../svg/FloorplanLoadingSvg.tsx";

export function FloorPlanLoadingFallback(){
    return(
        <Box
            sx={{
                width: "100%",
                height: "100svh",
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "visible",
            }}
        >
            <Box sx={{
                width: {xs:"30%", sm:"15%", lg:"10%"},
                height: "auto" }}>
                <FloorPlanLoadingSvg />
            </Box>
        </Box>
    )
}