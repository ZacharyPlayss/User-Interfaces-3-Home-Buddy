import React from "react";
import {useColorScheme} from "@mui/material/styles";
import {ToggleButton, ToggleButtonGroup, Tooltip} from "@mui/material";
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

export function ThemeColorControlsHorizontal() {
    const {mode, setMode} = useColorScheme();

    if (!mode) return null;

    const handleChange = (
        _event: React.MouseEvent<HTMLElement>,
        newMode: "system" | "light" | "dark" | null
    ) => {
        if (newMode) setMode(newMode);
    };

    return (
        <ToggleButtonGroup
            value={mode}
            exclusive
            onChange={handleChange}
            size="small"
        >
            <Tooltip title="System">
                <ToggleButton value="system"
                              aria-label="system mode">
                    <SettingsBrightnessIcon/>
                </ToggleButton>
            </Tooltip>

            <Tooltip title="Light">
                <ToggleButton value="light"
                              aria-label="light mode">
                    <LightModeIcon/>
                </ToggleButton>
            </Tooltip>

            <Tooltip title="Dark">
                <ToggleButton value="dark"
                              aria-label="dark mode">
                    <DarkModeIcon/>
                </ToggleButton>
            </Tooltip>
        </ToggleButtonGroup>
    );
}
