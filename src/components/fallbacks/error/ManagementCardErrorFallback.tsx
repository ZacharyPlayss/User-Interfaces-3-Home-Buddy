import {Button, Card, CardContent, CardMedia, Typography} from "@mui/material";
import {SmallErrorSvg} from "../../svg/SmallErrorSvg.tsx";
import type {FallbackProps} from "react-error-boundary";


export function ManagementCardErrorFallback({ error, resetErrorBoundary}: FallbackProps) {
    const errorCode = error?.status ?? error.code ?? "";
    return (
        <>
            <Card sx={{mt: 2, position: "relative", minWidth: 300, maxWidth:350}}>
                <CardMedia
                    component={SmallErrorSvg}
                    height="250"
                    errorCode={errorCode}
                    sx={{
                        width: "100%",
                        objectFit: "cover",
                        display: "block",
                        borderRadius: 0,
                        pt:4
                    }}
                />
                <CardContent
                    sx={{m: 1, display:"flex",flexDirection:"column" ,justifyContent:"center"}}
                >
                    <Typography variant={"h4"}>
                        Er ging iets mis...
                    </Typography>
                    <Button
                        variant={"outlined"}
                        sx={{mt:2}}
                        onClick={resetErrorBoundary}
                        >
                        Opnieuw proberen?
                    </Button>
                </CardContent>
            </Card>
        </>
    )
}