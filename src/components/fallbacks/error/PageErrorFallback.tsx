import {Button, Card, CardContent, CardMedia, Stack, Typography} from "@mui/material";
import {SmallErrorSvg} from "../../svg/SmallErrorSvg.tsx";
import type {FallbackProps} from "react-error-boundary";
import {Link} from "react-router-dom";
import {useMediaQueries} from "../../../hooks/useMediaQueries.tsx";

export function PageErrorFallback({error, resetErrorBoundary}: FallbackProps) {
    const {isSmallScreen } = useMediaQueries();
    const errorCode = error.status ?? null;
    return (
        <div style={{
            width: "100vw",
            height: "100svh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <Card sx={{width: "75%", p: 4}}>
                <CardMedia
                    component={SmallErrorSvg}
                    height="250"
                    errorCode={errorCode}
                    sx={{
                        width: "100%",
                        objectFit: "cover",
                        display: "block",
                        borderRadius: 0,
                        pt: 4
                    }}
                />
                <CardContent
                    sx={{
                        m: 1, display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    <Typography variant={"h4"}>
                        Er ging iets mis bij het laden van deze pagina.
                    </Typography>
                    <Stack direction={isSmallScreen?"column":"row"}>
                        <Button
                            variant={"outlined"}
                            sx={{m: 1}}
                            onClick={resetErrorBoundary}
                        >
                            Opnieuw proberen
                        </Button>
                        <Button
                            component={Link}
                            to={"/"}
                            variant={"contained"}
                            sx={{m:1}}
                            color={"secondary"}
                            onClick={resetErrorBoundary}
                        >
                            Naar het hoofdmenu
                        </Button>
                    </Stack>
                </CardContent>
            </Card>
        </div>
    )
}