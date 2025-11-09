import {Box, Snackbar, SnackbarContent, Typography} from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import type {SnackbarProps} from "./snackbarProps.ts";


export function ErrorSnackbar({msg}: SnackbarProps){
    return(
        <Snackbar
            anchorOrigin={{vertical: "bottom", horizontal: "right"}}
            open={true}
            autoHideDuration={5000}
        >
            <SnackbarContent
                sx={(theme) => ({
                    backgroundColor: theme.palette.secondary.main,
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    borderRadius: 2,
                    padding: "8px 16px",
                })}
                message={
                    <Box display="flex"
                         alignItems="center">
                        <ErrorIcon fontSize="small"/>
                        <Typography variant="body2"
                                    sx={{ml: 1}}>
                            {msg}
                        </Typography>
                    </Box>
                }
            />
        </Snackbar>
    )
}