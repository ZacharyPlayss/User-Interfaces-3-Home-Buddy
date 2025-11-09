import {SpeedDial} from "@mui/material";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {useMediaQueries} from "../../hooks/useMediaQueries.tsx";

interface SmallScreenCardActionsProps {
    editTooltip: string,
    deleteTooltip: string,
    setEditing: () => void,
    setDeleting: () => void,
}

export function SmallScreenCardActions({editTooltip, deleteTooltip, setEditing, setDeleting}: SmallScreenCardActionsProps) {
    const {isSmallScreen } = useMediaQueries();
    if(!isSmallScreen){
        return;
    }
    return <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{position: "absolute", bottom: 16, right: 16}}
        icon={<SpeedDialIcon/>}
    >
        <SpeedDialAction

            icon={<EditIcon/>}
            slotProps={{
                tooltip: {
                    title: editTooltip,
                },
            }}
            onClick={setEditing}
        />
        <SpeedDialAction

            icon={<DeleteIcon/>}
            slotProps={{
                tooltip: {
                    title: deleteTooltip,
                },
            }}
            onClick={setDeleting}
        />
    </SpeedDial>;
}