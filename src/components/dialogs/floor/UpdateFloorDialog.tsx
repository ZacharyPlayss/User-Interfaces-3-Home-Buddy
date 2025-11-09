import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import type {Floor} from "../../../model/Floor.ts";
import {FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {updateFloorSchema} from "../../../schemas/floorSchema.ts";
import {FloorVisualizer} from "../../Floorplan";
import {FormWithPreview} from "../../Forms/FormWithPreview.tsx";
import {FloorFormFields} from "../../Forms/formfields/floor/FloorFormFields.tsx";

interface UpdateFloorDialogProps {
    currentFloor: Floor,
    isOpen: boolean,
    onClose: () => void,
    onUpdateFloor: (data:Floor) => void
}

export function UpdateFloorDialog({currentFloor, isOpen, onClose,onUpdateFloor}: UpdateFloorDialogProps) {
    const methods = useForm({
        resolver: zodResolver(updateFloorSchema),
        defaultValues: {
            id: currentFloor.id,
            name:currentFloor.name,
            description: currentFloor.description,
            width: Number(currentFloor.width),
            height: Number(currentFloor.height),
            x: Number(currentFloor.x),
            y: Number(currentFloor.y),
            level: Number(currentFloor.level)
        }
    })

    const {handleSubmit,watch, reset, formState: {isSubmitting}} = methods;

    function handleFloorUpdate(data: Floor) {
        onUpdateFloor(data);
        onClose();
        reset();
    }

    const width = watch("width");
    const height= watch("height");
    const offsetX = watch("x");
    const offsetY = watch("y");

    return (
        <Dialog open={isOpen}
                onClose={onClose}
                maxWidth={"lg"}
        >
            <DialogTitle>Verdieping bijwerken</DialogTitle>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(handleFloorUpdate)}
                      noValidate>
                    <DialogContent>
                        <FormWithPreview
                            formFields={<FloorFormFields/>}
                            previewElement={
                                <div style={{position:"relative"}}>
                                    <FloorVisualizer
                                        width={`${width}rem`}
                                        height={`${height}rem`}
                                        positionX={`${offsetX}rem`}
                                        positionY={`${offsetY}rem`}
                                        showBorder={true}
                                    />
                                </div>
                            }
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button type="submit"
                                variant={"contained"}
                                color={"primary"}
                                disabled={isSubmitting}>
                            Verdieping bijwerken
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
