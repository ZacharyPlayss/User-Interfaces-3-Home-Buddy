import {Box, Button, Card, Typography, useMediaQuery, useTheme} from "@mui/material";
import {WelcomeSvg} from "../../svg/WelcomeSvg.tsx";
import {useTour} from "@reactour/tour";


export function FloorplanEmptyFallback() {
    const {setIsOpen } = useTour();
    const theme = useTheme();
    const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <>
            <Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Card
                    sx={{
                        width: isMediumScreen? "85svw" : "80svw",
                        height: isMediumScreen? "90svh" :"70svh",
                        display: "flex",
                        borderRadius: 4,
                        boxShadow: 6,
                        flexDirection: isMediumScreen ? "column" : "row",
                        maxWidth: 1250
                    }}
                >
                    <Box
                        sx={{
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            p: 4,
                            textAlign: "left",
                        }}
                    >
                        <Typography variant="h3" gutterBottom sx={{fontSize:40}}>
                            Welkom <span style={{ color: theme.palette.primary.main, whiteSpace:"nowrap"}}>thuis</span>!
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            Er zijn nog geen vloeren of kamers aangemaakt...
                        </Typography>

                        <Button
                            variant={"contained"}
                            color={"primary"}
                            onClick={() => setIsOpen(true)}
                        >
                            Begin met inrichten
                        </Button>
                    </Box>

                    <Box
                        sx={{
                            flex: 1,
                            pointerEvents:"none",
                            alignContent:"end"
                        }}
                    >
                        <WelcomeSvg
                            isSmallScreen={isMediumScreen}
                            style={{
                                height: isMediumScreen? "auto":"100%",
                                width: isMediumScreen ? "100%":"auto",
                                transform:isMediumScreen?"translateX(-5%) translateY(-5%) scale(112%)":"initial"
                            }}
                        />
                    </Box>
                </Card>
            </Box>
        </>
    )
}