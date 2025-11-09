import React, {useState} from "react";
import {Card, IconButton, Menu} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import Settings from "../Settings.tsx";

export function ThemeColorControls() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    return (
        <Card id={"onboarding-sixth-step"} sx={{ml: 2, p: 1, width: "fit-content"}}>
            <IconButton
                onClick={handleClick}
                size="small"
                aria-label="Open settings menu"
            >
                <SettingsIcon/>
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{vertical: "bottom", horizontal: "right"}}
                transformOrigin={{vertical: "top", horizontal: "right"}}
                slotProps={{
                    paper: {
                        sx: { padding: 2 }
                    },
                    list: {
                        sx: { py: 2, px: 1 }
                    }
                }}
            >
                <Settings/>
            </Menu>
        </Card>
    );
}
