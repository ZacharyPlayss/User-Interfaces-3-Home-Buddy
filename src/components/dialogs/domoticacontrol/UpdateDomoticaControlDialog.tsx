import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import type {DomoticaControl,} from "../../../model/DomoticaControl.ts";
import {useAllRooms} from "../../../hooks/data/get/all/useAllRooms.tsx";
import {type DomoticaControlAudio, type DomoticaControlHeater, type DomoticaControlLightType, type DomoticaControlLock} from "../../../model/DomoticaControlValueTypes.ts";
import {FormProvider, useForm} from "react-hook-form";
import {type UpdateDomoticaControlFormValues, updateDomoticaControlSchema} from "../../../schemas/domoticaControlSchema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {domoticaControlTypeDefaultValues} from "../../../config/defaultValues";
import {DomoticaControlFormFields} from "../../Forms/formfields/domoticaControl/DomoticaControlFormFields.tsx";
import {DomoticaControlVisualizer, RoomVisualizer} from "../../Floorplan";
import {FormWithPreview} from "../../Forms/FormWithPreview.tsx";
import {domoticaControlTypeIconMap} from "../../../model/DomoticaControlTypes.ts";
import {useEffect} from "react";

interface FormDialogProps {
    currentDomoticaControl: DomoticaControl,
    isOpen: boolean,
    onClose: () => void,
    onUpdateDomoticaControl: (data: DomoticaControl) => void
}


export function UpdateDomoticaControlDialog({
                                                currentDomoticaControl,
                                                isOpen,
                                                onClose,
                                                onUpdateDomoticaControl
                                            }: FormDialogProps) {
    const {rooms} = useAllRooms();

    function getDefaultValues() {
        if (currentDomoticaControl.type === "licht") {
            return {
                id: currentDomoticaControl.id,
                name: currentDomoticaControl.name,
                type: "licht" as const,
                upcCode: currentDomoticaControl.upcCode,
                x: currentDomoticaControl.x,
                y: currentDomoticaControl.y,
                description: currentDomoticaControl.description,
                value: currentDomoticaControl.value as DomoticaControlLightType,
                defaultValue: domoticaControlTypeDefaultValues[currentDomoticaControl.type],
                roomId: currentDomoticaControl.roomId
            };
        }
        if (currentDomoticaControl.type === "verwarming") {
            return {
                id: currentDomoticaControl.id,
                name: currentDomoticaControl.name,
                type: "verwarming" as const,
                upcCode: currentDomoticaControl.upcCode,
                x: currentDomoticaControl.x,
                y: currentDomoticaControl.y,
                description: currentDomoticaControl.description,
                value: currentDomoticaControl.value as DomoticaControlHeater,
                defaultValue: domoticaControlTypeDefaultValues[currentDomoticaControl.type],
                roomId: currentDomoticaControl.roomId
            };
        }
        if (currentDomoticaControl.type === "deurslot") {
            return {
                id: currentDomoticaControl.id,
                name: currentDomoticaControl.name,
                type: "deurslot" as const,
                upcCode: currentDomoticaControl.upcCode,
                x: currentDomoticaControl.x,
                y: currentDomoticaControl.y,
                description: currentDomoticaControl.description,
                value: currentDomoticaControl.value as DomoticaControlLock,
                defaultValue: domoticaControlTypeDefaultValues[currentDomoticaControl.type],
                roomId: currentDomoticaControl.roomId
            };
        }
        if (currentDomoticaControl.type === "audio") {
            return {
                id: currentDomoticaControl.id,
                name: currentDomoticaControl.name,
                type: "audio" as const,
                upcCode: currentDomoticaControl.upcCode,
                x: currentDomoticaControl.x,
                y: currentDomoticaControl.y,
                description: currentDomoticaControl.description,
                value: currentDomoticaControl.value as DomoticaControlAudio,
                defaultValue: domoticaControlTypeDefaultValues[currentDomoticaControl.type],
                roomId: currentDomoticaControl.roomId
            };
        }
        throw new Error("Invalid type");
    }

    const defaultValues = getDefaultValues();
    const methods = useForm<UpdateDomoticaControlFormValues>({
        resolver: zodResolver(updateDomoticaControlSchema),
        defaultValues: defaultValues
    })
    const {handleSubmit, reset, watch, setValue, formState: {isSubmitting}} = methods;

    function handleFormSubmit(data: DomoticaControl) {
        onUpdateDomoticaControl(data);
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
        <Dialog
            open={isOpen}
            onClose={onClose}
            maxWidth={"lg"}
        >
            <DialogTitle>Apparaat bijwerken</DialogTitle>
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
                            Apparaat bijwerken
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