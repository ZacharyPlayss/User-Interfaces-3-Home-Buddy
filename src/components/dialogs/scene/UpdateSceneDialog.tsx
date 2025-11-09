import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import {zodResolver} from "@hookform/resolvers/zod";
import {FormProvider, useForm} from "react-hook-form";
import {updateSceneSchema, type UpdateSceneSchemaFormValues} from "../../../schemas/sceneSchema.ts";
import type {Scene} from "../../../model/Scene.ts";
import type {Automation} from "../../../model/Automation.ts";
import {useUpdateScene} from "../../../hooks/data/update/useUpdateScene.tsx";
import {useUpdateAutomation} from "../../../hooks/data/update/useUpdateAutomation.tsx";
import {useAddAutomation} from "../../../hooks/data/add/useAddAutomation.tsx";
import {useDeleteAutomation} from "../../../hooks/data/delete/useDeleteAutomation.tsx";
import {SceneFormFields} from "../../Forms/formfields/scene/SceneFormFields.tsx";


interface UpdateSceneDialogProps {
    isOpen: boolean,
    onClose: () => void,
    sceneToUpdate: Scene,
    existingAutomations: Automation[]
}

export function UpdateSceneDialog({isOpen, onClose, sceneToUpdate, existingAutomations}: UpdateSceneDialogProps) {
    const {updateScene} = useUpdateScene();
    const {updateAutomation} = useUpdateAutomation();
    const {addNewAutomation} = useAddAutomation();
    const {deleteAutomation} = useDeleteAutomation();
    const methods = useForm({
        resolver: zodResolver(updateSceneSchema),
        defaultValues: {
            id: sceneToUpdate.id,
            name: sceneToUpdate.name,
            description: sceneToUpdate.description,
            enabled: false,
            isGlobal: sceneToUpdate.isGlobal,
            image: sceneToUpdate.image,
            controls: sceneToUpdate.controls,
            isAutomated: existingAutomations.length != 0,
            automations: existingAutomations.length > 0
                ? existingAutomations.map(a => ({
                    id: a.id,
                    sceneId: a.sceneId,
                    start: new Date(a.start),
                    end: new Date(a.end),
                    isEnabled: a.enabled,
                    isInterrupted: a.isInterrupted,
                }))
                : [
                    {
                        id: "",
                        sceneId: sceneToUpdate.id,
                        start: new Date(),
                        end: new Date(Date.now() + 3600 * 1000),
                        isEnabled: false,
                        isInterrupted: false,
                    },
                ],
        }
    })

    const {handleSubmit, reset, formState: {isSubmitting}} = methods;

    function handleFormSubmit(data: UpdateSceneSchemaFormValues) {
        const {automations, ...updatedScene} = data;

        if (updatedScene != sceneToUpdate) {
            updateScene(updatedScene);
        }
        if (automations) {
            automations.forEach((automation) => {
                //User wants automations configured.
                    if (updatedScene.isAutomated) {
                        const original = existingAutomations.find((existingAtomation) => existingAtomation.id === automation.id);
                        if (!original) {
                            addNewAutomation({
                                start: automation.start,
                                end: automation.end,
                                sceneId: sceneToUpdate.id,
                                enabled: false,
                                isInterrupted: false
                            })
                            return;
                        }
                        const changed =
                            original.start !== automation.start ||
                            original.end !== automation.end ||
                            original.enabled !== automation.isEnabled ||
                            original.isInterrupted !== automation.isInterrupted ||
                            original.sceneId !== automation.sceneId;

                        if (changed) {
                            const { isEnabled, ...rest } = automation;
                            updateAutomation({...rest, enabled: isEnabled});
                        }
                    }
                    //user no longer wants it automated so we remove any existing automations.
                    if(!updatedScene.isAutomated && existingAutomations){
                        existingAutomations.forEach((existingAutomation) => {
                            deleteAutomation(existingAutomation.id)
                        })
                    }

                }
            )
        }

        onClose();
        reset();
    }


    return (
        <Dialog open={isOpen}
                onClose={onClose}>
            <DialogTitle>Scene bijwerken</DialogTitle>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(handleFormSubmit, (errors) => {
                    console.error("Validation errors:", errors);
                })}
                      noValidate>
                    <DialogContent>
                        <SceneFormFields/>
                    </DialogContent>
                    <DialogActions>
                        <Button type="submit"
                                variant={"contained"}
                                color={"primary"}
                                disabled={isSubmitting}>
                            Scene bijwerken
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
