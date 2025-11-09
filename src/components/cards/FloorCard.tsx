import {Breadcrumbs, Button, Card, Stack, Typography} from "@mui/material";
import {Suspense, useState} from "react";
import {UpdateFloorDialog} from "../dialogs/floor/UpdateFloorDialog.tsx";
import {useUpdateFloor} from "../../hooks/data/update/useUpdateFloor.tsx";
import {RequiresUserBoundary} from "../Boundary";
import {Link} from "react-router-dom";
import type {FloorWithRooms} from "../../model/Floor.ts";
import {NewRoomDialog} from "../dialogs/room/NewRoomDialog.tsx";
import {DialogLoadingFallback} from "../fallbacks/loading/DialogLoadingFallback.tsx";
import {ErrorBoundary} from "react-error-boundary";
import {useDeleteFloor} from "../../hooks/data/delete/useDeleteFloor.tsx";
import {ConfirmationDialog} from "../dialogs/ConfirmationDialog.tsx";
import {useAllRoomsForFloor} from "../../hooks/data/get/all/useAllRoomsForFloor.tsx";
import {ValueCard} from "./ValueCard.tsx";
import {SmallScreenCardActions} from "./SmallScreenCardActions.tsx";
import {LargeScreenCardActions} from "./LargeScreenCardActions.tsx";
import {DialogErrorFallback} from "../fallbacks/error/DialogErrorFallback.tsx";
import {useMediaQueries} from "../../hooks/useMediaQueries.tsx";

interface FloorCardProps {
    selectedFloor: FloorWithRooms,
    selectRoom: (roomId: string) => void
}

export function FloorCard({selectedFloor, selectRoom}: FloorCardProps) {
    const {rooms} = useAllRoomsForFloor(selectedFloor.id);
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isAddingRoom, setIsAddingRoom] = useState(false);
    const {updateFloor} = useUpdateFloor();
    const {deleteFloor} = useDeleteFloor();
    const {isSmallScreen} = useMediaQueries();

    return (
        <>
            <Card sx={{mt: 2, p: 2, position: "relative", minWidth: 300}}>
                {!isSmallScreen &&
                    <RequiresUserBoundary requiredRole={"admin"}>
                        <LargeScreenCardActions
                            setIsEditing={setIsEditing}
                            setIsDeleting={setIsDeleting}
                        />
                    </RequiresUserBoundary>
                }
                {isSmallScreen &&
                    <Breadcrumbs aria-label="breadcrumb">
                        <Typography
                            component={Link}
                            to="/building"
                            sx={{
                                color: 'text.primary',
                                textDecoration: 'none',
                                '&:hover': {
                                    textDecoration: 'underline',
                                },
                                cursor:"pointer"
                            }}
                        >
                            Gebouw
                        </Typography>
                        <Typography sx={{color: 'text.primary'}}>
                            {selectedFloor.name}
                        </Typography>
                    </Breadcrumbs>
                }

                <Stack direction={"column"}
                       spacing={2}
                       justifyContent={"space-between"}
                       alignItems="flext-start"
                       sx={{mb: 1}}>
                    <Typography variant={"h4"}>
                        Verdieping {selectedFloor.level}
                    </Typography>
                    <Button
                        variant={"contained"}
                        color={"primary"}
                        onClick={() => setIsAddingRoom(true)}
                    >
                        Kamer toevoegen
                    </Button>
                </Stack>

                <Typography>
                    {selectedFloor.description}
                </Typography>

                <Stack direction={"row"}
                       gap={2}
                       sx={{mt: 1}}>
                    <ValueCard label={"X"}
                               value={selectedFloor.x}/>
                    <ValueCard label={"Y"}
                               value={selectedFloor.y}/>
                </Stack>

                <Stack direction={"row"}
                       gap={2}
                       sx={{mt: 1}}>
                    <ValueCard label={"breedte"}
                               value={selectedFloor.width}/>
                    <ValueCard label={"hoogte"}
                               value={selectedFloor.height}/>
                </Stack>


                <Stack direction={"column"}>
                    {selectedFloor.rooms.map((room) =>
                        <Button key={room.id}
                                variant={"outlined"}
                                sx={{mt: 2}}
                                onClick={() => selectRoom(room.id)}>
                            {room.name}
                        </Button>
                    )}
                </Stack>
            </Card>

            <SmallScreenCardActions key={"floor-actions"}
                                    editTooltip={"Huidige vloer bijwerken"}
                                    deleteTooltip={"Huidige vloer verwijderen"}
                                    setEditing={() => setIsEditing(true)}
                                    setDeleting={() => setIsDeleting(true)}/>
            <ErrorBoundary
                fallbackRender={({error, resetErrorBoundary}) => (
                    <DialogErrorFallback error={error}
                                         resetErrorBoundary={resetErrorBoundary}/>
                )}
            >
                <RequiresUserBoundary requiredRole={"admin"}>
                    <UpdateFloorDialog
                        currentFloor={selectedFloor}
                        isOpen={isEditing}
                        onClose={() => setIsEditing(false)}
                        onUpdateFloor={(data) => updateFloor(data)}
                    />
                </RequiresUserBoundary>
                <Suspense fallback={<DialogLoadingFallback/>}>
                    <NewRoomDialog
                        currentFloor={selectedFloor}
                        isOpen={isAddingRoom}
                        onClose={() => setIsAddingRoom(false)}
                    />
                </Suspense>
                <ConfirmationDialog
                    isOpen={isDeleting}
                    onAccept={() => deleteFloor(selectedFloor.id)}
                    onClose={() => setIsDeleting(false)}
                    confirmationMessage={"Weet je zeker dat je deze vloer wilt verwijderen?"}
                    confirmationDescription={"(Deze actie kan niet ongedaan worden gemaakt!)"}
                    warningMessage={
                        rooms.length != 0 ? "Deze vloer bevat nog " + rooms.length + " kamer(s) deze zullen ook worden verwijderd." : ""
                    }
                />
            </ErrorBoundary>
        </>
    )
}