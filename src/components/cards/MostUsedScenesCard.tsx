import {Box, Button, Card, CardContent, type SxProps, type Theme, Typography} from "@mui/material";
import {HorizontalSceneCard} from "./horizontal/HorizontalSceneCard.tsx";
import {Link} from "react-router-dom";
import type {Scene} from "../../model/Scene.ts";
import {useMostUsedScenes} from "../../hooks/useMostUsedScenes.tsx";

type MostUsedScenesProps = {
    sx?: SxProps<Theme>
    scenes: Scene[]
}

export function MostUsedScenesCard({sx, scenes}: MostUsedScenesProps) {
    const {getAllSceneIdsByUsageCount} = useMostUsedScenes();

    let displayedScenes: Scene[] = [];
    const sortedSceneIds = getAllSceneIdsByUsageCount();
    if (sortedSceneIds.length >= 2) {
        displayedScenes = sortedSceneIds
            .map(id => scenes.find(scene => scene.id === id))
            .filter((scene): scene is Scene => scene !== undefined)
            .slice(0, 2);
    }

    if (displayedScenes.length < 2) {
        displayedScenes = scenes.slice(0, 2);
    }

    return (
        <>
            <Card sx={{...sx, pointerEvents: "initial"}}>
                <CardContent>

                    {scenes.length != 0 ?

                        <>
                            <Typography gutterBottom
                                        variant="h6"
                                        component="div">
                                Meest gebruikte scenes
                            </Typography>
                            <Box sx={{maxHeight: 200, overflowY: "auto"}}>
                                {displayedScenes.map((scene) => (
                                    <HorizontalSceneCard key={`scene-${scene.id}`} scene={scene} />
                                ))}
                            </Box>
                        </>
                        :
                        <>
                            <Typography gutterBottom
                                        variant="h6"
                                        component="div">
                               Er zijn nog geen scenes...
                            </Typography>
                            <Typography>
                                Gebruik onderstaande knoppen om een nieuwe scene te maken!
                            </Typography>
                        </>
                    }


                </CardContent>
                <Button variant={"contained"}
                        color={"secondary"}
                        sx={{m: 2}}
                        component={Link}
                        to={`/scenes`}
                >
                    Bekijk alle scenes
                </Button>
            </Card>
        </>
    )
}