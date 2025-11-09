import React from "react";
import "./FloorVisualizer.scss"
import {useTheme} from "@mui/material";

type FloorVisualizerProps = {
    width: string;
    height: string;
    positionX?: string;
    positionY?: string;
    showBorder?:boolean;
};

export function FloorVisualizer({width,height,positionX="0", positionY="0",children, showBorder=false}: React.PropsWithChildren<FloorVisualizerProps>) {
    const theme = useTheme();
    return (
        <div
            className={"floor-outer-container"}
            style={{
                width: width,
                height: height,
                top: positionX,
                left: positionY,
                border: showBorder?`4px solid ${theme.palette.primary.main}`:''
            }}
        >
            {children}
        </div>
    );
}
