import {Box, Button, Card, Stack, Typography} from "@mui/material";
import {BuildingStructureList} from "../components/lists/BuildingStructureList.tsx";
import {useAllFloorsWithRooms} from "../hooks/data/get/all/useAllFloorsWithRooms.tsx";
import {Suspense, useState} from "react";
import {FloorCard} from "../components/cards/FloorCard.tsx";
import {RoomCard} from "../components/cards/RoomCard.tsx";
import {NewFloorDialog} from "../components/dialogs/floor/NewFloorDialog.tsx";
import {ManagementCardErrorFallback} from "../components/fallbacks/error/ManagementCardErrorFallback.tsx";
import {SceneCardLoadingFallback} from "../components/fallbacks/loading/SceneCardLoadingFallback.tsx";
import {ErrorBoundary} from "react-error-boundary";
import {useNavigate, useParams} from "react-router-dom";
import {useMediaQueries} from "../hooks/useMediaQueries.tsx";
import {RequiresUserBoundary} from "../components/Boundary";

export function BuildingManagement() {
    const {isSmallScreen} = useMediaQueries();
    const {floors} = useAllFloorsWithRooms();
    const navigate = useNavigate();
    const {floorId, roomId} = useParams();
    const [isAddingFloor, setIsAddingFloor] = useState(false);

    const selectFloor = (selectedFloorId: string) => {
        const nextFloorId = selectedFloorId === floorId ? null : selectedFloorId;
        if (nextFloorId != null) {
            navigate(`/building/${nextFloorId}`);
        } else {
            navigate(`/building`);
        }
    };

    const selectRoom = (selectedRoomId: string) => {
        const nextRoomId = selectedRoomId === roomId ? null : selectedRoomId;
        if (nextRoomId != null) {
            navigate(`/building/${floorId}/${nextRoomId}`)
        } else {
            navigate(`/building/${floorId}`)
        }
    }

    const selectedFloor = floors.find((floor) => floor.id === floorId) || null;
    const selectedRoom = selectedFloor?.rooms.find((room) => room.id === roomId) || null;

    return (
        <Box sx={{p: 3, mt: 6, position: "relative", height: "90vh"}}>
            <Stack
                spacing={2}
                direction={isSmallScreen ? "column" : "row"}
                sx={{height: "100%"}}
            >
                {isSmallScreen ? (
                    <>
                        {selectedRoom && selectedFloor ? (
                            <ErrorBoundary
                                fallbackRender={({error, resetErrorBoundary}) => (
                                    <ManagementCardErrorFallback error={error}
                                                                 resetErrorBoundary={resetErrorBoundary}/>
                                )}
                            >
                                <RoomCard room={selectedRoom}
                                          floor={selectedFloor}/>
                            </ErrorBoundary>
                        ) : selectedFloor ? (
                            <ErrorBoundary
                                fallbackRender={({error, resetErrorBoundary}) => (
                                    <ManagementCardErrorFallback error={error}
                                                                 resetErrorBoundary={resetErrorBoundary}/>
                                )}
                            >
                                <Suspense fallback={<SceneCardLoadingFallback/>}>
                                    <FloorCard selectedFloor={selectedFloor}
                                               selectRoom={selectRoom}/>
                                </Suspense>
                            </ErrorBoundary>
                        ) : (
                            <>
                                <Card sx={{mt: 8, p: 2, minWidth: 350}}>
                                    <Stack direction={"row"}
                                           spacing={2}
                                           justifyContent={"space-between"}
                                           alignItems="center"
                                           sx={{mb: 1}}>
                                        <Typography variant="h4">Building</Typography>
                                        <Button
                                            variant={"contained"}
                                            color={"primary"}
                                            onClick={() => setIsAddingFloor(true)}
                                        >
                                            Add Floor
                                        </Button>
                                    </Stack>
                                    <BuildingStructureList
                                        floors={floors}
                                        updateFloor={selectFloor}
                                    />
                                </Card>
                            </>
                        )}
                    </>
                ) : (
                    <>
                        <Card sx={{mt: 8, p: 2, minWidth: 300}}>
                            {floors.length != 0 ?
                                <>
                                    <Stack direction={"row"}
                                           spacing={2}
                                           justifyContent={"space-between"}
                                           alignItems="center"
                                           sx={{mb: 1}}>
                                        <Typography variant="h4">Gebouw</Typography>
                                        <RequiresUserBoundary requiredRole={"admin"}>
                                            <Button
                                                variant={"contained"}
                                                color={"primary"}
                                                onClick={() => setIsAddingFloor(true)}
                                            >
                                                Verdieping aanmaken
                                            </Button>
                                        </RequiresUserBoundary>
                                    </Stack>
                                </>
                                :
                                <>
                                    <Stack direction={"column"}>
                                        <Typography variant={"h4"}>Geen vloeren...</Typography>
                                        <Typography>Maak een vloer aan om jou 'slim huis' te configureren!</Typography>
                                        <RequiresUserBoundary requiredRole={"admin"}>
                                            <Button
                                                sx={{mt: 2}}
                                                variant={"contained"}
                                                color={"primary"}
                                                onClick={() => setIsAddingFloor(true)}
                                            >
                                                Verdieping aanmaken
                                            </Button>
                                        </RequiresUserBoundary>
                                    </Stack>
                                </>
                            }
                            <BuildingStructureList
                                floors={floors}
                                updateFloor={selectFloor}
                            />
                        </Card>

                        {selectedFloor && (
                            <ErrorBoundary
                                fallbackRender={({error, resetErrorBoundary}) => (
                                    <ManagementCardErrorFallback error={error}
                                                                 resetErrorBoundary={resetErrorBoundary}/>
                                )}
                            >
                                <Suspense fallback={<SceneCardLoadingFallback/>}>
                                    <FloorCard selectedFloor={selectedFloor}
                                               selectRoom={selectRoom}/>
                                </Suspense>
                            </ErrorBoundary>
                        )}

                        {selectedRoom && selectedFloor && (
                            <ErrorBoundary
                                fallbackRender={({error, resetErrorBoundary}) => (
                                    <ManagementCardErrorFallback error={error}
                                                                 resetErrorBoundary={resetErrorBoundary}/>
                                )}
                            >
                                <RoomCard room={selectedRoom}
                                          floor={selectedFloor}/>
                            </ErrorBoundary>
                        )}
                    </>
                )}
            </Stack>
            <NewFloorDialog
                isOpen={isAddingFloor}
                onClose={() => setIsAddingFloor(false)}/>
        </Box>
    );
}
