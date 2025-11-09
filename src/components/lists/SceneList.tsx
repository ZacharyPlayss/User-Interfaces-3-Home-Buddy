import {List, ListItemButton, ListItemText} from "@mui/material";
import type {Scene} from "../../model/Scene.ts";

interface SceneListProps {
    scenes: Scene[],
    updateScene: (sceneId: string) => void
}

export function SceneList({scenes,updateScene}: SceneListProps) {
    return (
        <>
            <List>
                {scenes.map((scene) => (
                    <ListItemButton key={scene.id} onClick={() => updateScene(scene.id)}>
                        <ListItemText primary={`${scene.name}`}/>
                    </ListItemButton>
                ))}
            </List>
        </>
    )
}