import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import type {DomoticaControlWithoutId} from "../../../model/DomoticaControl.ts";
import {useAllRooms} from "../../../hooks/data/get/all/useAllRooms.tsx";
import {useCurrentSelectionStore} from "../../../store/currentSelectionStore.ts";
import {newDomoticaControlSchemaWithCustomRestrictions} from "../../../schemas/domoticaControlSchema.ts";
import {FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {DomoticaControlFormFields} from "../../Forms/formfields/domoticaControl/DomoticaControlFormFields.tsx";
import {useAddDomoticaControl} from "../../../hooks/data/add/useAddDomoticaControl.tsx";
import {DomoticaControlVisualizer, RoomVisualizer} from "../../Floorplan";
import {FormWithPreview} from "../../Forms/FormWithPreview.tsx";
import {domoticaControlTypeIconMap} from "../../../model/DomoticaControlTypes.ts";
import {domoticaControlTypeDefaultValues} from "../../../config/defaultValues";
import {useEffect} from "react"

interface FormDialogProps {
    isOpen: boolean,
    onClose: () => void
}


export function NewDomoticaControlDialog({isOpen, onClose}: FormDialogProps) {
    const {rooms} = useAllRooms();
    const selectedRoomId = useCurrentSelectionStore((state) => state.selectedRoomId);
    const {addNewDomoticaControl} = useAddDomoticaControl();

    const methods = useForm({
        resolver: zodResolver(newDomoticaControlSchemaWithCustomRestrictions),
        defaultValues: {
            name: "Sfeerverlichting",
            type: "licht",
            upcCode: "1111111111111",
            x: 0,
            y: 0,
            description: "Subtiele sfeerverlichting.",
            value: domoticaControlTypeDefaultValues["licht"],
            defaultValue: domoticaControlTypeDefaultValues["licht"],
            roomId: selectedRoomId ?? "1",
        }
    })
    const {handleSubmit, reset, watch, setValue, formState: {isSubmitting}} = methods;

    function handleFormSubmit(data: DomoticaControlWithoutId) {
        addNewDomoticaControl(data);
        onClose();
        reset();
    }

    const type = watch("type");
    const userSelectedRoomId = watch("roomId");
    const x = watch("x");
    const y = watch("y");

    const userSelectedRoom = rooms.find((room) => room.id === userSelectedRoomId);
    const IconComponent = domoticaControlTypeIconMap[type];

    useEffect(() => {
        setValue("value", domoticaControlTypeDefaultValues[type]);
        setValue("defaultValue", domoticaControlTypeDefaultValues[type]);
    }, [type, setValue]);

    return (
        <Dialog open={isOpen}
                onClose={onClose}
                maxWidth={"lg"}
        >
            <DialogTitle>Nieuw apparaat</DialogTitle>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(handleFormSubmit)}
                      noValidate>
                    <DialogContent>
                        <FormWithPreview
                            formFields={
                                <DomoticaControlFormFields
                                    onTypeChange={() => {
                                        setValue("value", domoticaControlTypeDefaultValues[type]);
                                        setValue("defaultValue", domoticaControlTypeDefaultValues[type]);
                                    }}
                                    rooms={rooms}
                                    type={type}
                                />
                            }
                            previewElement={
                                <div style={{position: "relative"}}>
                                    {userSelectedRoom &&
                                        <RoomVisualizer
                                            name={userSelectedRoom.name}
                                            width={userSelectedRoom.width}
                                            height={userSelectedRoom.height}
                                            roomid={userSelectedRoom.id}>
                                            <DomoticaControlVisualizer
                                                domoticaControlId={"none"}
                                                positionX={x}
                                                positionY={y}
                                                icon={<IconComponent/>}/>
                                        </RoomVisualizer>
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
                            Apparaat aanmaken
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