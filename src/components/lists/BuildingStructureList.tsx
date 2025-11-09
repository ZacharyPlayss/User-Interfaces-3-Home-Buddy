import {Fragment} from "react";
import {List, ListItemButton, ListItemText} from "@mui/material";
import type {Floor} from "../../model/Floor.ts";

interface BuildingStructureListProps{
    floors:Floor[],
    updateFloor: (floorId:string) => void,
}

export function BuildingStructureList({floors,updateFloor}:BuildingStructureListProps){
    return(
        <List>
            {floors.map((floor) => (
                <Fragment key={floor.id}>
                    <ListItemButton key={floor.id} onClick={() => updateFloor(floor.id)}>
                        <ListItemText primary={`Verdieping ${floor.level}`}/>
                    </ListItemButton>
                </Fragment>
            ))}
        </List>
    )
}
