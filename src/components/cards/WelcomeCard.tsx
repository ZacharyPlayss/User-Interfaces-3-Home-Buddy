import {Box, Card, Typography, useTheme} from "@mui/material";
import {AuthenticationButtons} from "../AuthenticationButtons.tsx";
import {WelcomeSvg} from "../svg/WelcomeSvg.tsx";
import {useMediaQueries} from "../../hooks/useMediaQueries.tsx";

export function WelcomeCard() {
    const theme = useTheme();
    const {isSmallScreen ,isMediumScreen} = useMediaQueries();
    return (
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
                        Welkom bij <span style={{ color: theme.palette.primary.main, whiteSpace:"nowrap"}}>Home Buddy</span>!
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Klaar om jouw slimme huis tot leven te wekken?
                    </Typography>
                    <Typography gutterBottom>
                        Jij hebt de touwtjes in handen!
                    </Typography>
                    <AuthenticationButtons direction={isSmallScreen ? "column":"row"} />
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
    );
}

