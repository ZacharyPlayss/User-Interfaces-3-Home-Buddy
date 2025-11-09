import {Breadcrumbs, Button, Card, Stack, Typography} from "@mui/material";
import {Suspense, useState} from "react";
import {UpdateRoomDialog} from "../dialogs/room/UpdateRoomDialog.tsx";
import {useUpdateRoom} from "../../hooks/data/update/useUpdateRoom.tsx";
import {RequiresUserBoundary} from "../Boundary";
import type {Floor} from "../../model/Floor.ts";
import {Link} from "react-router-dom";
import type {Room} from "../../model/Room.ts";
import {ErrorBoundary} from "react-error-boundary";
import {DialogLoadingFallback} from "../fallbacks/loading/DialogLoadingFallback.tsx";
import {useDeleteRoom} from "../../hooks/data/delete/useDeleteRoom.tsx";
import {ConfirmationDialog} from "../dialogs/ConfirmationDialog.tsx";
import {useDomoticaControlsForRoom} from "../../hooks/data/get/useDomoticaControlsForRoom.tsx";
import {ValueCard} from "./ValueCard.tsx";
import {SmallScreenCardActions} from "./SmallScreenCardActions.tsx";
import {LargeScreenCardActions} from "./LargeScreenCardActions.tsx";
import {NewDomoticaControlDialog} from "../dialogs/domoticacontrol/NewDomoticaControlDialog.tsx";
import AddIcon from "@mui/icons-material/Add";
import {DialogErrorFallback} from "../fallbacks/error/DialogErrorFallback.tsx";
import {useMediaQueries} from "../../hooks/useMediaQueries.tsx";

interface RoomCardProps {
    floor: Floor,
    room: Room
}

export function RoomCard({room, floor}: RoomCardProps) {
    const {domoticaControls} = useDomoticaControlsForRoom(room.id);
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isAddingDevice, setIsAddingDevice] = useState(false);
    const {updateRoom} = useUpdateRoom();
    const {deleteRoom} = useDeleteRoom();
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
                                cursor: "pointer"
                            }}
                        >
                            Building
                        </Typography>
                        <Typography
                            component={Link}
                            to={`/building/${floor.id}`}
                            sx={{
                                color: 'text.primary',
                                textDecoration: 'none',
                                '&:hover': {
                                    textDecoration: 'underline',
                                },
                                cursor: "pointer"
                            }}
                        >
                            {floor.name}
                        </Typography>
                        <Typography sx={{color: 'text.primary'}}>
                            {room.name}
                        </Typography>
                    </Breadcrumbs>
                }
                <Typography variant={"h4"}>
                    {room.name}
                </Typography>
                <Typography>
                    {room.description}
                </Typography>
                <Stack direction={"row"}
                       gap={2}
                       sx={{mt: 1}}>
                    <ValueCard label={"X"}
                               value={room.x}/>
                    <ValueCard label={"Y"}
                               value={room.y}/>
                </Stack>
                <Stack direction={"row"}
                       gap={2}
                       sx={{mt: 1}}>
                    <ValueCard label={"breedte"}
                               value={room.width}/>
                    <ValueCard label={"hoogte"}
                               value={room.height}/>
                </Stack>
                <RequiresUserBoundary requiredRole={"admin"}>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon/>}
                        onClick={() => setIsAddingDevice(true)}
                        sx={{mt: 2}}
                    >
                        Apparaat toevoegen
                    </Button>
                </RequiresUserBoundary>
            </Card>

            <SmallScreenCardActions key={"room-actions"}
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
                    <Suspense fallback={<DialogLoadingFallback/>}>
                        <UpdateRoomDialog
                            currentRoom={room}
                            currentFloor={floor}
                            isOpen={isEditing}
                            onClose={() => setIsEditing(false)}
                            onUpdateRoom={(data) =>
                                updateRoom(data)}
                        />
                    </Suspense>
                </RequiresUserBoundary>

                <ConfirmationDialog
                    isOpen={isDeleting}
                    onAccept={() => deleteRoom(room.id)}
                    onClose={() => setIsDeleting(false)}
                    confirmationMessage={"Weet je zeker dat je deze kamer wilt verwijderen?"}
                    confirmationDescription={"(Deze actie kan niet ongedaan worden gemaakt!)"}
                    warningMessage={
                        domoticaControls.length != 0 ? "Deze kamer bevat nog " + domoticaControls.length + " devices, deze zullen ook verwijderd worden."
                            : ""
                    }
                />
                <NewDomoticaControlDialog isOpen={isAddingDevice}
                                          onClose={() => setIsAddingDevice(false)}/>
            </ErrorBoundary>
        </>
    )
}