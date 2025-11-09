import {Box} from "@mui/material";
import {useAllFloorsWithRooms} from "../../hooks/data/get/all/useAllFloorsWithRooms.tsx";
import {useEffect} from "react";
import {Canvas} from '@react-three/fiber'
import {OrbitControls} from '@react-three/drei';
import {ErrorBoundary} from "react-error-boundary";
import {RoomVisualizer, ThreeRoomVisualizer, wallHeight} from "./RoomVisualizer";
import type {Room} from "../../model/Room.ts";
import {useDomoticaControls} from "../../hooks/data/get/useDomoticaControls.tsx";
import {ThreeDomoticaControlVisualizer} from "./DomoticaControlVisualizer/ThreeDomoticaControlVisualizer.tsx";
import {domoticaControlTypeIconMap} from "../../model/DomoticaControlTypes.ts";
import {ThreeFloorPlanLighting} from "./ThreeFloorPlanLighting.tsx";
import {MathUtils} from 'three';
import {FloorPlanErrorFallback} from "../fallbacks/error/FloorPlanErrorFallback.tsx";
import {FloorplanEmptyFallback} from "../fallbacks/empty/FloorplanEmptyFallback.tsx";
import {useTour} from "@reactour/tour";
import {useCurrentSelectionStore} from "../../store/currentSelectionStore.ts";
import {AnimatedThreeFloorVisualizer} from "./FloorVisualizer/AnimatedThreeFloorVisualizer.tsx";
import type {FloorPlanMode} from "../../config/floorplan";
import {TransformComponent, TransformWrapper} from "react-zoom-pan-pinch";
import {FloorVisualizer} from "./FloorVisualizer";
import {DomoticaControlVisualizer} from "./DomoticaControlVisualizer";

interface FloorPlanProps{
    selectedFloorIndex: number
    setSelectedFloorIndex: (value:number) => void
    floorPlanMode: FloorPlanMode
}

export function FloorPlan({selectedFloorIndex, setSelectedFloorIndex, floorPlanMode}: FloorPlanProps) {
    const {isOpen: tourOpen} = useTour();
    const {floors} = useAllFloorsWithRooms();
    const {domoticaControls} = useDomoticaControls();
    const selectedFloorId = useCurrentSelectionStore(state => state.selectedFloorId);

    useEffect(() => {
        if (selectedFloorId && floors.length > 0) {
            const floorIndex = floors.findIndex(floor => floor.id === selectedFloorId);
            if (floorIndex !== -1) {
                setSelectedFloorIndex(floorIndex);
                return;
            }
        }

        if (floors.length > 0) {
            setSelectedFloorIndex(0);
        }
    }, [selectedFloorId, floors]);


    if (floors.length === 0 && !tourOpen) {
        return <FloorplanEmptyFallback/>
    }

    const currentLevel = floors[selectedFloorIndex]?.level ?? 0;
    const floorsToRender = floors.filter(floor => floor.level <= currentLevel);

    return (
        <>
            <Box
                sx={{
                    width: "100%",
                    height: "100svh",
                    position: "relative"
                }}
            >
                <ErrorBoundary
                    fallbackRender={({error, resetErrorBoundary}) => (
                        <FloorPlanErrorFallback error={error}
                                                resetErrorBoundary={resetErrorBoundary}/>
                    )}
                >
                    {floorPlanMode === "3D" &&
                    <Canvas shadows
                            camera={{position: [0, 50, 0]}}
                    >
                        <ThreeFloorPlanLighting/>
                        <OrbitControls
                            makeDefault
                            target={[0, selectedFloorIndex * wallHeight, 0]}
                            minPolarAngle={MathUtils.degToRad(10)}
                            maxPolarAngle={MathUtils.degToRad(90)}
                            enablePan={false}
                        />
                        <group position={[-Math.max(...floors.map(floor => floor.width)) / 2, 0, -Math.max(...floors.map(floor => floor.height)) / 2]}>
                            {floorsToRender.map((floor, floorIndex: number) => (
                                <AnimatedThreeFloorVisualizer
                                    key={`floor-${floor.id}`}
                                    floor={floor}
                                    floorIndex={floorIndex}
                                >
                                    {floor.rooms.map((room: Room) => {
                                        const roomControls = domoticaControls.filter(control => control.roomId === room.id);
                                        return (
                                            <ThreeRoomVisualizer
                                                key={`room-${room.id}`}
                                                room={room}
                                                showWallsSolid={floorIndex != selectedFloorIndex}
                                                highlightEdges={floorIndex === selectedFloorIndex}
                                            >
                                                {roomControls.map(control => {
                                                    if (floorIndex != selectedFloorIndex) {
                                                        return;
                                                    }
                                                    const IconComponent = domoticaControlTypeIconMap[control.type];
                                                    return (
                                                        <ThreeDomoticaControlVisualizer
                                                            key={"control-" + control.id}
                                                            domoticaControl={control}
                                                            icon={<IconComponent sx={{
                                                                fontSize: '2rem',
                                                                color: 'black'
                                                            }}/>}
                                                            positionX={control.x}
                                                            positionY={control.y}
                                                        />
                                                    );
                                                })}
                                            </ThreeRoomVisualizer>
                                        );
                                    })}
                                </AnimatedThreeFloorVisualizer>
                            ))}
                        </group>
                    </Canvas>
                    }

                    {floorPlanMode === "2D" &&
                        <TransformWrapper
                            initialScale={1}
                            minScale={0.5}
                            maxScale={4}
                            centerOnInit={true}
                            centerZoomedOut={true}
                            limitToBounds={false}
                            wheel={{step: 50}}
                            doubleClick={{disabled: true}}
                        >
                            <TransformComponent
                                wrapperStyle={{width: "100%", height: "100%"}}
                                contentStyle={{
                                    width: `${floors[selectedFloorIndex].width}rem`,
                                    height: `${floors[selectedFloorIndex].height}rem`,
                                }}
                            >
                                <FloorVisualizer
                                    key={floors[selectedFloorIndex].id}
                                    width={`${floors[selectedFloorIndex].width}rem`}
                                    height={`${floors[selectedFloorIndex].height}rem`}
                                >
                                    {floors[selectedFloorIndex].rooms.map((room: Room) => {
                                        const roomControls = domoticaControls.filter(
                                            (control) => control.roomId === room.id
                                        );

                                        return (
                                            <RoomVisualizer
                                                key={room.id}
                                                name={room.name}
                                                width={room.width}
                                                height={room.height}
                                                x={room.x}
                                                y={room.y}
                                                roomid={room.id}
                                                onClick={() => {}}
                                            >
                                                {roomControls.map(control => {
                                                    const IconComponent = domoticaControlTypeIconMap[control.type];
                                                    return (
                                                        <DomoticaControlVisualizer
                                                            key={"control-" + control.id}
                                                            domoticaControlId={control.id}
                                                            icon={<IconComponent sx={{fontSize: '2rem', color: 'black'}} />}
                                                            positionX={control.x}
                                                            positionY={control.y}
                                                        />
                                                    );
                                                })}
                                            </RoomVisualizer>
                                        );
                                    })}
                                </FloorVisualizer>
                            </TransformComponent>
                        </TransformWrapper>
                    }
                </ErrorBoundary>
            </Box>
        </>
    );
}