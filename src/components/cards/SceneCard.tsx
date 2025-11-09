import {Box, Breadcrumbs, Button, Card, CardContent, CardMedia, Stack, Typography} from "@mui/material";
import {useState} from "react";
import {SceneControlPreviewCard} from "./SceneControlPreviewCard.tsx";
import {UpdateSceneDialog} from "../dialogs/scene/UpdateSceneDialog.tsx";
import type {Scene} from "../../model/Scene.ts";
import {RequiresUserBoundary} from "../Boundary";
import {useEnableScene} from "../../hooks/data/update/useEnableScene.tsx";
import {useDisableActiveScenes} from "../../hooks/useDisableActiveScenes.tsx";
import {Link} from "react-router-dom";
import {useDeleteScene} from "../../hooks/data/delete/useDeleteScene.tsx";
import {ConfirmationDialog} from "../dialogs/ConfirmationDialog.tsx";
import {useAutomationsBySceneId} from "../../hooks/data/get/useAutomationsBySceneId.tsx";
import {SmallScreenCardActions} from "./SmallScreenCardActions.tsx";
import {LargeScreenCardActions} from "./LargeScreenCardActions.tsx";
import {TimeValueCard} from "./TimeValueCard.tsx";
import {NoImageFallback} from "../fallbacks/NoImageFallback.tsx";
import {useMediaQueries} from "../../hooks/useMediaQueries.tsx";

interface SceneCardProps {
    selectedScene: Scene,
}

export function SceneCard({selectedScene}: SceneCardProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const {automations} = useAutomationsBySceneId(selectedScene.id);
    const {deleteScene} = useDeleteScene();
    const {enableScene} = useEnableScene();
    const {disableActiveScenes} = useDisableActiveScenes();
    const {isSmallScreen} = useMediaQueries();

    return (
        <>
            <Card sx={{mt: 2, position: "relative", minWidth: 300}}>
                {!isSmallScreen &&
                    <RequiresUserBoundary requiredRole={"admin"}>
                        <LargeScreenCardActions
                            setIsEditing={setIsEditing}
                            setIsDeleting={setIsDeleting}
                        />
                    </RequiresUserBoundary>
                }
                {selectedScene.image ?
                    <CardMedia
                        component="img"
                        height="194"
                        image={selectedScene.image}
                        alt="Paella dish"
                        sx={{
                            width: "100%",
                            height: 200,
                            objectFit: "cover",
                            display: "block",
                            borderRadius: 0,
                        }}
                    />
                    :
                    <NoImageFallback height={100} width={"100%"} name={selectedScene.name}/>
                }
                <CardContent
                    sx={{m: 1}}
                >
                    {isSmallScreen &&
                        <Breadcrumbs aria-label="breadcrumb">
                            <Typography
                                component={Link}
                                to="/scenes"
                                sx={{
                                    color: 'text.primary',
                                    textDecoration: 'none',
                                    '&:hover': {
                                        textDecoration: 'underline',
                                    },
                                    cursor:"pointer",
                                }}
                            >
                                Scenes
                            </Typography>
                            <Typography sx={{color: 'text.primary'}}>
                                {selectedScene.name}
                            </Typography>
                        </Breadcrumbs>
                    }
                    <Typography variant={"h4"}>
                        {selectedScene.name}
                    </Typography>
                    <Typography>
                        {selectedScene.description}
                    </Typography>
                    <Stack direction={"row"}
                           sx={{mt: 2}}>
                        {!selectedScene.enabled &&
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => enableScene(selectedScene)}
                            >
                                Activeer scene
                            </Button>
                        }
                        {selectedScene.enabled &&
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => disableActiveScenes()}
                            >
                                Deactiveer scene
                            </Button>
                        }
                    </Stack>
                    <Typography sx={{mt: 3}}>
                        Apparaten in deze scene
                    </Typography>
                    <Box sx={{maxHeight: 150, overflowY: "scroll"}}>
                        {selectedScene.controls.map((controlValue) => {
                            return (<SceneControlPreviewCard key={"control-" + controlValue.id}
                                                             controlValue={controlValue}/>
                            )
                        })}
                    </Box>

                    {automations.length != 0 && <>
                        <Typography sx={{mt: 3}}>
                            Deze scene wordt automatisch actief tussen:
                        </Typography>
                        <Box>
                            <Stack direction="row"
                                   sx={{m: 1}}>
                                {automations.map((automation) => (
                                    <TimeValueCard
                                        key={automation.id}
                                        start={automation.start}
                                        end={automation.end}
                                    />
                                ))}
                            </Stack>
                        </Box>
                    </>
                    }
                </CardContent>


                <RequiresUserBoundary requiredRole={"admin"}>
                    <UpdateSceneDialog isOpen={isEditing}
                                       onClose={() => setIsEditing(false)}
                                       sceneToUpdate={selectedScene}
                                       existingAutomations={automations}
                    />
                </RequiresUserBoundary>
                <ConfirmationDialog
                    isOpen={isDeleting}
                    onAccept={() => deleteScene(selectedScene.id)}
                    onClose={() => setIsDeleting(false)}
                    confirmationMessage={"Weet je zeker dat je deze scene wilt verwijderen?"}
                    confirmationDescription={"(Deze actie kan niet ongedaan worden gemaakt!)"}
                    warningMessage={automations.length != 0 ? "De " + automations.length + " gekoppelde tijdsloten zullen hierdoor ook verwijderd worden." : ""}
                />
            </Card>
            <SmallScreenCardActions key={"floor-actions"}
                                    editTooltip={"Huidige scene bijwerken"}
                                    deleteTooltip={"Huidige scene verwijderen"}
                                    setEditing={() => setIsEditing(true)}
                                    setDeleting={() => setIsDeleting(true)}/>
        </>
    )
}