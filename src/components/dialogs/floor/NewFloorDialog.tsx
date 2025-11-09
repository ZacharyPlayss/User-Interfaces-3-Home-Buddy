import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import {newFloorSchema} from "../../../schemas/floorSchema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {FormProvider, useForm} from "react-hook-form";
import type {FloorWithoutId} from "../../../model/Floor.ts";
import {useAddFloor} from "../../../hooks/data/add/useAddFloor.tsx";
import {useTour} from "@reactour/tour";
import {useCurrentSelectionStore} from "../../../store/currentSelectionStore.ts";
import {FormWithPreview} from "../../Forms/FormWithPreview.tsx";
import {FloorFormFields} from "../../Forms/formfields/floor/FloorFormFields.tsx";
import {FloorVisualizer} from "../../Floorplan";

interface NewFloorProps {
    isOpen: boolean,
    onClose: () => void,
    showCancel?: boolean
}


export function NewFloorDialog({isOpen, onClose, showCancel = true}: NewFloorProps) {
    const {addNewFloor} = useAddFloor();
    const {isOpen: tourOpen, setCurrentStep, currentStep} = useTour();
    const updateSelectedFloorId = useCurrentSelectionStore((state) => state.updateSelectedFloorId)


    const methods = useForm({
        resolver: zodResolver(newFloorSchema),
        defaultValues: {
            name: "Nieuwe Vloer",
            description: "Dit is het gelijksvloers.",
            width: 10,
            height: 10,
            x: 0,
            y: 0,
            level: 0
        }
    })

    const {handleSubmit, reset,watch, formState: {isSubmitting}} = methods;

    function handleFormSubmit(data: FloorWithoutId) {
        addNewFloor(data, {
            onSuccess: (newFloor) => {
                updateSelectedFloorId(newFloor.id);
            }
        });
        if (tourOpen) {
            setCurrentStep(currentStep + 1);
        }
        onClose();
        reset();
    }

    const width = watch("width");
    const height= watch("height");
    const offsetX = watch("x");
    const offsetY = watch("y");

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            maxWidth={"md"}
        >
            <DialogTitle >Nieuwe verdieping</DialogTitle>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(handleFormSubmit)}
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
                            Verdieping aanmaken
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
