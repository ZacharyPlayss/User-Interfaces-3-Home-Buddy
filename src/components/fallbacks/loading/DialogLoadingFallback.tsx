import {Dialog, DialogContent, Skeleton} from "@mui/material";


export function DialogLoadingFallback() {
    return (
        <>
            <Dialog open={true}>
                <DialogContent>
                    <Skeleton variant="rectangular"
                              height={40}
                              width="80%"
                              sx={{mb: 2, borderRadius: 1}}/>
                    <Skeleton variant="rectangular"
                              height={40}
                              width="60%"
                              sx={{mb: 2, borderRadius: 1}}/>
                    <Skeleton variant="rectangular"
                              height={40}
                              width="90%"
                              sx={{mb: 2, borderRadius: 1}}/>
                </DialogContent>
            </Dialog>
        </>
    )
}