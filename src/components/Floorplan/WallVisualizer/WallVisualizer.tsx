import "./WallVisualizer.scss";
import {useTheme} from "@mui/material";

export type WallVisualizerProps = {
    width: string;
    height: string;
    positionX: string;
    positionY: string;
    doorRotation?: 0|90|180|270
};

export function WallVisualizer({width, height, positionX, positionY}: WallVisualizerProps) {
    const theme = useTheme();
    return (
        <div
            className={"wall-outer-container"}
            style={{
                background:theme.palette.text.primary,
                border:`2px solid ${theme.palette.primary.main}`,
                width: width,
                height: height,
                top: positionY,
                left: positionX
            }}
        >
        </div>
    );
}
