import React from "react";
import "./FloorVisualizer.scss"
import {Box} from "@react-three/drei";
import {useTheme} from "@mui/material";

type FloorVisualizerProps = {
    width: number;
    height: number;
    onClick?: () => void;
};

export const floorThickness = 0.5;

export function ThreeFloorVisualizer({ width, height, children }: React.PropsWithChildren<FloorVisualizerProps>) {
    const theme = useTheme();
    return (
        <group>
            <Box
                name={"floor"}
                args={[width, floorThickness, height]}
                position={[width / 2, floorThickness / 2, height / 2]}
                castShadow
                receiveShadow
                material-color={theme.palette.grey[400]}
            />
            <group>
                {children}
            </group>
        </group>
    );
}