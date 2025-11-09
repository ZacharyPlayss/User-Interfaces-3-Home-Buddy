import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import {zodResolver} from "@hookform/resolvers/zod";
import {FormProvider, useForm} from "react-hook-form";
import {newSceneSchema, type NewSceneSchemaFormValues} from "../../../schemas/sceneSchema.ts";
import {SceneFormFields} from "../../Forms/formfields/scene/SceneFormFields.tsx";
import {useAddScene} from "../../../hooks/data/add/useAddScene.tsx";
import {UserContext} from "../../../context/contexts/UserContext.tsx";
import {useContext} from "react";
import {useAddAutomation} from "../../../hooks/data/add/useAddAutomation.tsx";
import type {Scene} from "../../../model/Scene.ts";

interface NewSceneDialogProps {
    isOpen: boolean,
    onClose: () => void,
}


export function NewSceneDialog({isOpen, onClose}: NewSceneDialogProps) {
    const {user} = useContext(UserContext);
    const {addNewSceneAsync} = useAddScene();
    const {addNewAutomationAsync} = useAddAutomation();
    const methods = useForm({
        resolver: zodResolver(newSceneSchema),
        defaultValues: {
            name: "New Scene",
            description: "A new scene",
            enabled: false,
            isGlobal: user?.role === "admin",
            image: "",
            controls: [],
            isAutomated: false,
            automations: [
                {
                    start: new Date(),
                    end: new Date(Date.now() + 3600 * 1000),
                },
            ],
        }
    })

    const {handleSubmit, reset, formState: {isSubmitting}} = methods;

    function handleFormSubmit(data: NewSceneSchemaFormValues) {
        const {automations, ...scene} = data;
        addNewSceneAsync(scene)
            .then((newScene: Scene) => {
                //only create automations when a user has toggled the 'isAutomated' switch.
                if (scene.isAutomated) {
                    const automationEntries = automations.map((automation) => ({
                        ...automation,
                        sceneId: newScene.id,
                        enabled: true,
                        isInterrupted: false,
                    }));
                    return Promise.all(
                        automationEntries.map((auto) => addNewAutomationAsync(auto))
                    );
                }
            })
        onClose();
        reset();
    }

    return (
        <Dialog open={isOpen}
                onClose={onClose}>
            <DialogTitle>Nieuwe scene</DialogTitle>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(handleFormSubmit)}
                      noValidate>
                    <DialogContent>
                        <SceneFormFields/>
                    </DialogContent>
                    <DialogActions>
                        <Button type="submit"
                                variant={"contained"}
                                color={"primary"}
                                disabled={isSubmitting}>
                            Scene toevoegen
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
