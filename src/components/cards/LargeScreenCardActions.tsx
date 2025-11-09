import {IconButton, Stack} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface LargeScreenCardActionsProps{
    setIsEditing: (newState:boolean) => void,
    setIsDeleting: (newState:boolean) => void
}

export function LargeScreenCardActions({setIsDeleting,setIsEditing}:LargeScreenCardActionsProps){
    return(
        <>
            <Stack
                sx={{
                    position: "absolute",
                    top: 4,
                    right: 4
                }}
                direction={"row"}>
                <IconButton
                    sx={(theme) => ({
                        mr: 1,
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                        "&:hover": {
                            backgroundColor: theme.palette.primary.dark,
                        },
                    })}
                    onClick={() => setIsEditing(true)}
                >
                    <EditIcon/>
                </IconButton>
                <IconButton
                    sx={(theme) => ({
                        backgroundColor: theme.palette.secondary.main,
                        color: theme.palette.secondary.contrastText,
                        "&:hover": {
                            backgroundColor: theme.palette.secondary.dark,
                        },
                    })}
                    onClick={() => setIsDeleting(true)}
                >
                    <DeleteIcon/>
                </IconButton>
            </Stack>
        </>
    )
}