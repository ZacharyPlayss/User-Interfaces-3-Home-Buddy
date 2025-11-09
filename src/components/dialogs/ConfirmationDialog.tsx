import {Button, Dialog, DialogActions, DialogTitle, Typography} from "@mui/material";

interface ConfirmationDialogProps {
    confirmationMessage?: string,
    confirmationDescription?: string,
    warningMessage?: string,
    isOpen: boolean,
    onAccept: () => void,
    onClose: () => void,
}


export function ConfirmationDialog({isOpen, onAccept, onClose, confirmationMessage= "Weet je het zeker?",confirmationDescription = "", warningMessage = ""}: ConfirmationDialogProps) {
    function handleAccept() {
        onAccept();
        onClose();
    }

    return (
        <Dialog open={isOpen}
                onClose={onClose}>
            <DialogTitle>
                <Typography >
                {confirmationMessage}
                </Typography>
                <Typography>
                    {confirmationDescription}
                </Typography>
                <Typography color={"secondary"} fontWeight={"bold"}>
                    {warningMessage}
                </Typography>
            </DialogTitle>
            <DialogActions>
                <Button
                    onClick={handleAccept}
                    variant={"contained"}
                    color={"primary"}
                >
                    Ja
                </Button>
                <Button onClick={onClose}
                        color="secondary"
                >
                    Nee
                </Button>
            </DialogActions>

        </Dialog>
    )
}
