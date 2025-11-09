import {Button, Dialog, DialogContent, Typography} from "@mui/material";
import type {FallbackProps} from "react-error-boundary";

export function DialogErrorFallback({error, resetErrorBoundary}: FallbackProps) {
    const errorCode = error?.status ?? error.code ?? "";
    return (
        <>
            <Dialog open={true}>
                <DialogContent>
                    {errorCode && (
                        <Typography
                            variant="h4"
                            gutterBottom
                            sx={(theme) => ({
                                color: theme.palette.primary.main,
                                fontWeight:"bold",
                                fontSize:75,
                                mb:-1
                            })}
                        >
                            {errorCode}
                        </Typography>
                    )}
                    <Typography>
                        Er ging iets fout bij het ophalen van extra data...
                    </Typography>
                    <Button
                        variant={"outlined"}
                        sx={{my: 1}}
                        onClick={resetErrorBoundary}
                    >
                        Opnieuw proberen
                    </Button>
                </DialogContent>
            </Dialog>
        </>
    )
}