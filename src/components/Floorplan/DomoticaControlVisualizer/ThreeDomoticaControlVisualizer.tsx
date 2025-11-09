import type {DomoticaControl} from "../../../model/DomoticaControl.ts";
import './DomoticaControlVisualizer.scss'
import {Html} from "@react-three/drei";
import {type ReactNode} from "react";
import {DomoticaControlVisualizer} from "./DomoticaControlVisualizer.tsx";

type ThreeDomoticaControlVisualizerProps = {
    domoticaControl: DomoticaControl
    positionY: number;
    positionX: number;
    onClick?: () => void;
    icon: ReactNode;
};

export function ThreeDomoticaControlVisualizer({domoticaControl, positionY, positionX,icon}: ThreeDomoticaControlVisualizerProps) {
    return (
        <>
            <Html
                occlude={false}
                position={[positionX, 2, positionY]}
                style={{ overflow: "visible", background: "transparent"}}
            >
                <DomoticaControlVisualizer domoticaControlId={domoticaControl.id} positionY={0} positionX={0} icon={icon}/>
            </Html>
        </>
    )
}