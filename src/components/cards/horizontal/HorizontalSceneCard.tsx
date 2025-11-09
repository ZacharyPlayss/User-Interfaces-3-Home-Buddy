import {Badge, Box, Button, Card, CardContent, CardMedia, Tooltip, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {useEnableScene} from "../../../hooks/data/update/useEnableScene.tsx";
import {UserContext} from "../../../context/contexts/UserContext.tsx";
import {useContext} from "react";
import {useDisableActiveScenes} from "../../../hooks/useDisableActiveScenes.tsx";
import type {Scene} from "../../../model/Scene.ts";
import {NoImageFallback} from "../../fallbacks/NoImageFallback.tsx";

interface SceneCardProps {
    scene: Scene
}

export function HorizontalSceneCard({scene}: SceneCardProps) {
    const {user} = useContext(UserContext);
    const {enableScene} = useEnableScene();
    const {disableActiveScenes} = useDisableActiveScenes();

    return (
        <>
            <Card
                sx={{
                    display: "flex",
                    flexDirection: {
                        xs: "column",
                        md: "row",
                    },
                    alignItems: "center",
                    minWidth: 300,
                    maxWidth: "100%",
                    p: 1,
                    mt: 2,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                    }}
                >
                    {scene.isGlobal ? (
                        <Tooltip
                            title="Global scenes are managed by the Admin. If you want a change to it, contact the admin user."
                            sx={{cursor: "pointer"}}
                        >
                            <Badge
                                badgeContent={"Globaal"}
                                color="primary"
                                sx={{
                                    "& .MuiBadge-badge": {
                                        top: 12,
                                        right: 30,
                                        p: 1.5,
                                    },
                                }}
                            >
                                {scene.image ?
                                    <CardMedia
                                        component="img"
                                        image={scene.image}
                                        alt="scene image"
                                        sx={{
                                            width: "100%",
                                            maxWidth:150,
                                            height: 150,
                                            objectFit: "cover",
                                            display: "block",
                                            borderRadius: 0,
                                        }}
                                    />
                                    :
                                    <NoImageFallback height={100} width={100} name={scene.name}/>
                                }
                            </Badge>
                        </Tooltip>
                    ) : (
                        <>
                            {scene.image ?
                                <CardMedia
                                    component="img"
                                    height="194"
                                    image={scene.image}
                                    alt={scene.name}
                                    sx={{
                                        width: "100%",
                                        height: 200,
                                        objectFit: "cover",
                                        display: "block",
                                        borderRadius: 0,
                                    }}
                                />
                                :
                                <NoImageFallback height={100} width={125} name={scene.name}/>
                            }
                        </>
                    )}

                    <CardContent
                        sx={{
                            flex: 1,
                            px: 2,
                            py: 1,
                            width: "100%",
                        }}
                    >
                        <Typography variant="h6">
                            {scene.name}
                        </Typography>
                        <Typography variant="body2"
                                    color="text.secondary">
                            {scene.description}
                        </Typography>
                    </CardContent>
                </Box>


                <Box
                    sx={{
                        display: "flex",
                        justifyContent: {
                            xs: "flex-end",
                        },
                        alignItems: "flex-start",
                        gap: 1,
                        flexWrap: "wrap",
                        width: "100%",
                        py: {
                            xs: 1,
                            md: 0,
                        },
                    }}
                >
                    {((user?.role === "admin") || (user?.role === "user" && !scene.isGlobal)) && (
                        <Button
                            variant="contained"
                            color="secondary"
                            component={Link}
                            to={`/scenes/${scene.id}`}
                        >
                            Scene bijwerken
                        </Button>
                    )}
                    {!scene.enabled ? (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => enableScene(scene)}
                        >
                            Scene activeren
                        </Button>
                    ) : (
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => disableActiveScenes()}
                        >
                            Scene deactiveren
                        </Button>
                    )}
                </Box>
            </Card>
        </>
    )
}