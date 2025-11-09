import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import type {Room} from "../../../model/Room.ts";
import {FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {updateRoomSchema} from "../../../schemas/newRoomSchema.ts";
import {useAllFloorsWithRooms} from "../../../hooks/data/get/all/useAllFloorsWithRooms.tsx";
import {RoomFormFields} from "../../Forms/formfields/room/RoomFormFields.tsx";
import {FloorVisualizer, RoomVisualizer} from "../../Floorplan";
import {FormWithPreview} from "../../Forms/FormWithPreview.tsx";
import type {Floor} from "../../../model/Floor.ts";

interface UpdateRoomDialogProps {
    currentRoom: Room,
    currentFloor: Floor,
    isOpen: boolean,
    onClose: () => void,
    onUpdateRoom: (data: Room) => void
}


export function UpdateRoomDialog({currentRoom,currentFloor, isOpen, onClose, onUpdateRoom}: UpdateRoomDialogProps) {
    const {floors} = useAllFloorsWithRooms();
    const methods = useForm({
        resolver: zodResolver(updateRoomSchema),
        defaultValues: {
            id: currentRoom.id,
            name: currentRoom.name,
            description: currentRoom.description,
            width: currentRoom.width,
            height: currentRoom.height,
            maxWidth: currentFloor.width,
            maxHeight: currentFloor.height,
            x: currentRoom.x,
            y: currentRoom.y,
            floorId: currentRoom.floorId
        }
    })

    const {handleSubmit, watch, reset, formState: {isSubmitting}} = methods;

    function handleRoomUpdate(data: Room) {
        onUpdateRoom(data);
        onClose();
        reset();
    }

    const selectedFloorId = watch("floorId")
    const name = watch("name");
    const width = watch("width");
    const height = watch("height");
    const x = watch("x");
    const y = watch("y");

    const selectedFloor = floors.find((floor) => floor.id === selectedFloorId);

    return (
        <Dialog open={isOpen}
                onClose={onClose}
                maxWidth={"lg"}
        >
            <DialogTitle>Kamer bijwerken</DialogTitle>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(handleRoomUpdate)}
                      noValidate>
                    <DialogContent>
                        <FormWithPreview
                            formFields={<RoomFormFields floors={floors}/>}
                            previewElement={
                                <div style={{position: "relative"}}>
                                    <FloorVisualizer
                                        width={`${selectedFloor?.width}rem`}
                                        height={`${selectedFloor?.height}rem`}
                                        showBorder={true}
                                    >
                                        {selectedFloor?.rooms.map((room: Room) =>
                                                room.id !== currentRoom.id && (
                                                    <RoomVisualizer
                                                        key={room.id}
                                                        name={room.name}
                                                        width={room.width}
                                                        height={room.height}
                                                        x={room.x}
                                                        y={room.y}
                                                        roomid={room.id}
                                                    />
                                                )
                                        )}
                                        <RoomVisualizer name={name}
                                                        width={width}
                                                        height={height}
                                                        x={x}
                                                        y={y}
                                                        roomid={"none"}/>

                                    </FloorVisualizer>

                                </div>
                            }
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button type="submit"
                                variant={"contained"}
                                color={"primary"}
                                disabled={isSubmitting}>
                            Kamer bijwerken
                        </Button>
                        <Button onClick={onClose}
                                color="secondary"
                                disabled={isSubmitting}>Annuleren</Button>
                    </DialogActions>
                </form>
            </FormProvider>
        </Dialog>
    )
}
