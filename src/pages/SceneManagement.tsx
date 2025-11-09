import {Box, Button, Card, Stack, Typography} from "@mui/material";
import {SceneList} from "../components/lists/SceneList.tsx";
import {Suspense, useState} from "react";
import {SceneCard} from "../components/cards/SceneCard.tsx";
import {NewSceneDialog} from "../components/dialogs/scene/NewSceneDialog.tsx";
import {useAllScenes} from "../hooks/data/get/all/useAllScenes.tsx";
import {ErrorBoundary} from "react-error-boundary";
import {SceneCardLoadingFallback} from "../components/fallbacks/loading/SceneCardLoadingFallback.tsx";
import {ManagementCardErrorFallback} from "../components/fallbacks/error/ManagementCardErrorFallback.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {DialogErrorFallback} from "../components/fallbacks/error/DialogErrorFallback.tsx";
import {useMediaQueries} from "../hooks/useMediaQueries.tsx";

export function SceneManagement() {
    const {sceneId} = useParams();
    const navigate = useNavigate();
    const {isSmallScreen} = useMediaQueries();
    const {scenes} = useAllScenes();
    const [isAddingScene, setIsAddingScene] = useState(false);

    function selectScene(selectedSceneId:string){
        const nextSceneId = selectedSceneId === sceneId ? null : selectedSceneId;
        if(nextSceneId != null){
            navigate(`/scenes/${nextSceneId}`);
        }else{
            navigate(`/scenes`);
        }
    }

    const selectedScene = scenes.find((scene) => scene.id === sceneId) || null;
    return (
        <Box sx={{p: 3, mt: 6, position: "relative", height: "90vh"}}>
            <Stack
                spacing={2}
                direction={isSmallScreen ? "column" : "row"}
                sx={{height: "100%"}}
            >
                {isSmallScreen ? (
                    <>
                        {selectedScene ? (
                            <ErrorBoundary
                                fallbackRender={({error, resetErrorBoundary}) => (
                                    <ManagementCardErrorFallback error={error}
                                                                 resetErrorBoundary={resetErrorBoundary}/>
                                )}
                            >
                                <Suspense fallback={<SceneCardLoadingFallback/>}>
                                    <SceneCard key={sceneId ?? "scene-card"}
                                               selectedScene={selectedScene}/>
                                </Suspense>
                            </ErrorBoundary>
                        ) : (
                            <Card sx={{mt: 8, p: 2, minWidth: 350}}>
                                <Stack direction={"row"}
                                       spacing={2}
                                       justifyContent={"space-between"}
                                       alignItems="center"
                                       sx={{mb: 1}}>
                                    <Typography variant={"h4"}>Scenes</Typography>
                                    <Button
                                        variant={"contained"}
                                        color={"primary"}
                                        onClick={() => setIsAddingScene(true)}
                                    >
                                        Add scene
                                    </Button>
                                </Stack>
                                <SceneList scenes={scenes}
                                           updateScene={(id: string) => selectScene(id)}/>
                            </Card>
                        )}
                    </>
                ) : (
                    <>
                        <Card sx={{mt: 8, p: 2, minWidth: 350}}>
                            {scenes.length != 0 ?
                                <>
                                    <Stack direction={"row"}
                                           spacing={2}
                                           justifyContent={"space-between"}
                                           alignItems="center"
                                           sx={{mb: 1}}>
                                        <Typography variant={"h4"}>Scenes</Typography>
                                        <Button
                                            variant={"contained"}
                                            color={"primary"}
                                            onClick={() => setIsAddingScene(true)}
                                        >
                                            Add scene
                                        </Button>
                                    </Stack>
                                    <SceneList scenes={scenes}
                                               updateScene={(id: string) => selectScene(id)}/>
                                </>
                                :
                                <>
                                    <Stack direction={"column"}>
                                        <Typography variant={"h4"}>Geen scenes...</Typography>
                                        <Typography>Maak een scene aan om vlot meerdere apparaten te
                                            controleren.</Typography>
                                        <Button
                                            variant={"contained"}
                                            color={"primary"}
                                            onClick={() => setIsAddingScene(true)}
                                        >
                                            Scene aanmaken
                                        </Button>
                                    </Stack>
                                </>
                            }
                        </Card>

                        {selectedScene && (
                            <ErrorBoundary
                                fallbackRender={({error, resetErrorBoundary}) => (
                                    <ManagementCardErrorFallback error={error}
                                                                 resetErrorBoundary={resetErrorBoundary}/>
                                )}
                            >
                                <Suspense fallback={<SceneCardLoadingFallback/>}>
                                    <SceneCard key={sceneId ?? "scene-card"}
                                               selectedScene={selectedScene}/>
                                </Suspense>
                            </ErrorBoundary>
                        )}
                    </>
                )}
            </Stack>

            <ErrorBoundary
                fallbackRender={({error, resetErrorBoundary}) => (
                    <DialogErrorFallback error={error}
                                            resetErrorBoundary={resetErrorBoundary}/>
                )}
            >
                <NewSceneDialog isOpen={isAddingScene}
                                onClose={() => setIsAddingScene(false)}/>
            </ErrorBoundary>
        </Box>
    );
}