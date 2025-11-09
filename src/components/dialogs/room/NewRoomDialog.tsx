import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import type {NewRoom, Room} from "../../../model/Room.ts";
import {FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {newRoomSchema} from "../../../schemas/newRoomSchema.ts";
import {RoomFormFields} from "../../Forms/formfields/room/RoomFormFields.tsx";
import {useAddRoom} from "../../../hooks/data/add/useAddRoom.tsx";
import {useTour} from "@reactour/tour";
import type {Floor} from "../../../model/Floor.ts";
import {FloorVisualizer, RoomVisualizer} from "../../Floorplan";
import {FormWithPreview} from "../../Forms/FormWithPreview.tsx";
import {useAllFloorsWithRooms} from "../../../hooks/data/get/all/useAllFloorsWithRooms.tsx";

interface FormDialogProps {
    currentFloor: Floor,
    isOpen: boolean,
    onClose: () => void,
    showCancel?: boolean
}

export function NewRoomDialog({currentFloor, isOpen, onClose, showCancel = true}: FormDialogProps) {
    const {floors} = useAllFloorsWithRooms();
    const {addNewRoom} = useAddRoom();
    const {isOpen: tourOpen, setCurrentStep, currentStep} = useTour();

    const methods = useForm({
        resolver: zodResolver(newRoomSchema),
        defaultValues: {
            name: "Mijn kamer",
            description: "Een nieuwe kamer",
            width: 5,
            height: 5,
            maxWidth: currentFloor.width,
            maxHeight: currentFloor.height,
            x: 0,
            y: 0,
            floorId: currentFloor.id,
        },
    });

    const {handleSubmit, watch, reset, formState: {isSubmitting}} = methods;


    function handleFormSubmit(data: NewRoom) {
        addNewRoom(data);
        if (tourOpen) {
            setCurrentStep(currentStep + 1);
        }
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
        <Dialog
                open={isOpen}
                onClose={onClose}
                maxWidth={"md"}
        >
            <DialogTitle id={"onboarding-first-step"}>Nieuwe kamer</DialogTitle>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(handleFormSubmit)}
                      noValidate>
                    <DialogContent>
                        <FormWithPreview
                            formFields={<RoomFormFields floors={floors}/>}
                            previewElement={
                                <div style={{position: "relative"}}>
                                    {selectedFloor &&
                                        <FloorVisualizer
                                            width={`${selectedFloor.width}rem`}
                                            height={`${selectedFloor.height}rem`}
                                            showBorder={true}
                                        >
                                            {selectedFloor.rooms.map((room: Room) => (
                                                <RoomVisualizer
                                                    key={room.id}
                                                    name={room.name}
                                                    width={room.width}
                                                    height={room.height}
                                                    x={room.x}
                                                    y={room.y}
                                                    roomid={room.id}
                                                />
                                            ))}
                                            <RoomVisualizer name={name}
                                                            width={width}
                                                            height={height}
                                                            x={x}
                                                            y={y}
                                                            roomid={"none"}/>

                                        </FloorVisualizer>
                                    }

                                </div>
                            }
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button type="submit"
                                variant={"contained"}
                                color={"primary"}
                                disabled={isSubmitting}>
                            Kamer aanmaken
                        </Button>
                        {showCancel &&
                            <Button onClick={onClose}
                                    color="secondary"
                                    disabled={isSubmitting}>Annuleren</Button>
                        }
                    </DialogActions>
                </form>
            </FormProvider>
        </Dialog>
    )
}