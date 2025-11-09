import type {DomoticaControl} from "../../model/DomoticaControl.ts";
import {IconButton, InputAdornment, List, ListItemButton, ListItemText, Stack, TextField, ToggleButton, ToggleButtonGroup} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {useState} from "react";
import Lightbulb from '@mui/icons-material/Lightbulb'; // For light
import Whatshot from '@mui/icons-material/Whatshot'; // For heating
import Lock from '@mui/icons-material/Lock'; // For door lock
import VolumeUp from '@mui/icons-material/VolumeUp'; // For audio


interface DeviceListProps {
    devices: DomoticaControl[],
    updateDomoticaControlId: (domoticaControlid: string) => void
}

export function DeviceList({devices, updateDomoticaControlId}: DeviceListProps) {
    const [filteredDevices, setFilteredDevices] = useState(devices);
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [searchString, setSearchString] = useState<string>("");

    const filterDevices = (newSearch: string = searchString, newTypes: string[] = selectedTypes) => {
        setSearchString(newSearch);
        setSelectedTypes(newTypes);

        setFilteredDevices(
            devices.filter((device) => {
                const matchesSearch =
                    newSearch.trim() === "" || device.name.toLowerCase().includes(newSearch.toLowerCase());
                const matchesType = newTypes.length === 0 || newTypes.includes(device.type.toLowerCase());
                return matchesSearch && matchesType;
            })
        );
    };

    return (
        <>
            <Stack direction={"column"} sx={{mt:2}}>
                <ToggleButtonGroup
                    value={selectedTypes}
                    onChange={(_, newVals) => filterDevices(undefined, newVals)}
                    aria-label="text alignment"
                >
                    <ToggleButton value={"licht"}>
                        <Lightbulb/>
                    </ToggleButton>
                    <ToggleButton value={"verwarming"}>
                        <Whatshot/>
                    </ToggleButton>
                    <ToggleButton value={"deurslot"}>
                        <Lock/>
                    </ToggleButton>
                    <ToggleButton value={"audio"}>
                        <VolumeUp/>
                    </ToggleButton>
                </ToggleButtonGroup>

                <TextField
                    id="input-with-icon-textfield"
                    label="Search device"
                    sx={{mt:2}}
                    onChange={(e) => filterDevices(e.target.value, undefined)}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <IconButton
                                        onClick={() => {
                                            console.log('Search icon clicked!');
                                        }}
                                        edge="start"
                                    >
                                        <SearchIcon/>
                                    </IconButton>
                                </InputAdornment>
                            ),
                        },
                    }}
                    variant="standard"
                />
            </Stack>
            <List sx={{mt:2}}>
                {filteredDevices.map((device) => (
                    <ListItemButton key={device.id}
                                    onClick={() => updateDomoticaControlId(device.id)}>
                        <ListItemText primary={`${device.name}`}/>
                    </ListItemButton>
                ))}
            </List>
        </>
    )
}