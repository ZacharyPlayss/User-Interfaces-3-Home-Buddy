import "./RoomVisualizer.scss"
import type {Room} from "../../../model/Room.ts";
import {Box, Edges} from "@react-three/drei";
import {floorThickness} from "../FloorVisualizer/ThreeFloorVisualizer.tsx";
import {type PropsWithChildren, useRef} from "react";
import {useFrame, useThree} from "@react-three/fiber";
import {Material, Mesh, Vector3} from "three";
import {wallHeight, wallWidth} from "./index.ts";
import {useTheme} from "@mui/material";

type RoomVisualizerProps = {
    room: Room,
    showWallsSolid: boolean,
    highlightEdges?:boolean
};


export function ThreeRoomVisualizer({room, children, showWallsSolid,highlightEdges = false}: PropsWithChildren<RoomVisualizerProps>) {
    const {camera} = useThree();
    const leftWallRef = useRef<Mesh>(null);
    const rightWallRef = useRef<Mesh>(null);
    const topWallRef = useRef<Mesh>(null);
    const bottomWallRef = useRef<Mesh>(null);
    const theme = useTheme();

    const wallNormals = {
        left: new Vector3(-1, 0, 0),
        right: new Vector3(1, 0, 0),
        top: new Vector3(0, 0, -1),
        bottom: new Vector3(0, 0, 1),
    };

    useFrame(() => {
        const walls = [
            { ref: leftWallRef, normal: wallNormals.left },
            { ref: rightWallRef, normal: wallNormals.right },
            { ref: topWallRef, normal: wallNormals.top },
            { ref: bottomWallRef, normal: wallNormals.bottom },
        ];

        walls.forEach(({ ref, normal }) => {
            if (!ref.current) return;
            const material = ref.current.material as Material & {
                transparent?: boolean;
                opacity?: number;
            };
            if (showWallsSolid) {
                material.transparent = false;
                material.opacity = 1;
                material.needsUpdate = true;
                return;
            }
            const wallPos = new Vector3();
            ref.current.getWorldPosition(wallPos);
            const camToWall = new Vector3().subVectors(wallPos, camera.position).normalize();
            const dot = normal.dot(camToWall);
            const shouldFade = dot < 0;
            if (shouldFade) {
                material.transparent = true;
                material.opacity = 0.2;
            } else {
                material.transparent = false;
                material.opacity = 1;
            }
            material.needsUpdate = true;
        });
    });

    return (
        <group position={[room.x + room.width / 2, floorThickness + wallHeight / 2, room.y + room.height / 2]}>
            <Box visible={false}
                 args={[room.width, wallHeight, room.height]}
                 castShadow
                 material-color={theme.palette.text.primary}
            >
                <Edges color={theme.palette.primary.main}
                       threshold={15}/>
            </Box>

            <group position={[-room.width / 2, 0, -room.height / 2]}>
                {children}
            </group>

            <Box
                ref={leftWallRef}
                name={"left-wall"}
                args={[wallWidth, wallHeight, room.height]}
                position={[0 - (room.width / 2) + (wallWidth / 2), 0, 0]}
                castShadow
                receiveShadow
                material-color={theme.palette.grey[400]}
            >
                <Edges color={highlightEdges? theme.palette.primary.main: theme.palette.grey[500]}
                       threshold={15}/>
            </Box>
            <Box
                ref={rightWallRef}
                name={"right-wall"}
                args={[wallWidth, wallHeight, room.height]}
                position={[(room.width / 2) - (wallWidth / 2), 0, 0]}
                castShadow
                receiveShadow
                material-color={theme.palette.grey[400]}
            >
                <Edges color={highlightEdges? theme.palette.primary.main: theme.palette.grey[500]}
                       threshold={15}/>
            </Box>
            <Box
                ref={topWallRef}
                name={"top-wall"}
                args={[room.width, wallHeight, wallWidth]}
                position={[0, 0, 0 - (room.height / 2) + (wallWidth / 2)]}
                castShadow
                receiveShadow
                material-color={theme.palette.grey[400]}
            >
                <Edges color={highlightEdges? theme.palette.primary.main: theme.palette.grey[500]}
                       threshold={15}/>
            </Box>
            <Box
                ref={bottomWallRef}
                name={"bottom-wall"}
                args={[room.width, wallHeight, wallWidth]}
                position={[0, 0, (room.height / 2) - (wallWidth / 2)]}
                castShadow
                receiveShadow
                material-color={theme.palette.grey[400]}
            >
                <Edges color={highlightEdges? theme.palette.primary.main: theme.palette.grey[500]}
                       threshold={15}/>
            </Box>
        </group>
    );
}