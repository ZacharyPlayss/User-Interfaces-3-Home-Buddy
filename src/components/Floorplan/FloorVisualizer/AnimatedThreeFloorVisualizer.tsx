import {type ReactNode, useRef, useState} from "react";
import "./FloorVisualizer.scss"
import {Group, Vector3} from 'three';
import {useFrame} from "@react-three/fiber";
import {ThreeFloorVisualizer} from "./ThreeFloorVisualizer.tsx";
import type {Floor} from "../../../model/Floor.ts";

type AnimatedThreeFloorVisualizerProps = {
    floor:Floor;
    children: ReactNode;
    floorIndex:number;
};

export function AnimatedThreeFloorVisualizer({ floor, children, floorIndex }:AnimatedThreeFloorVisualizerProps) {
    const groupRef = useRef<Group>(null);
    const [targetPosition] = useState(() => new Vector3(0, floorIndex*10, 0));
    useFrame(() => {
        if (groupRef.current) {
            groupRef.current.position.lerp(targetPosition, 0.1);
        }
    });

    return (
        <group ref={groupRef}>
            <ThreeFloorVisualizer
                width={floor?.width || 0}
                height={floor?.height || 0}
                onClick={() => {}}
                key={floor?.id}
            >
                {children}
            </ThreeFloorVisualizer>
        </group>
    );
}