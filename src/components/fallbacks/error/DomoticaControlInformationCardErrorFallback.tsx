import {Button, Card, CardContent, CardMedia, Typography} from "@mui/material";
import {SmallErrorSvg} from "../../svg/SmallErrorSvg.tsx";
import type {FallbackProps} from "react-error-boundary";
import {useMediaQueries} from "../../../hooks/useMediaQueries.tsx";

export function DomoticaControlInformationCardErrorFallback({ error, resetErrorBoundary}: FallbackProps){
    const errorCode = error?.status ?? error.code ?? "";
    const {isSmallScreen} = useMediaQueries();
    return(
        <>
            <Card sx={{
                minWidth: 250,
                width: isSmallScreen ? "90vw" : "100%",
                height:isSmallScreen?"80vh": "100%",
                position: isSmallScreen ? "fixed" : "relative",
                top: isSmallScreen ? "10svh" : "auto",
                left: isSmallScreen ? "5svw" : "auto",
                zIndex: isSmallScreen ? 1300 : "auto"
            }}>
                <CardMedia
                    component={SmallErrorSvg}
                    errorCode={errorCode}
                    sx={{
                        minWidth:250,
                        width: "100%",
                        maxHeight:"50%",
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