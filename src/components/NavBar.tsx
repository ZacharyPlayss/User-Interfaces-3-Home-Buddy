import {AppBar, Card, Collapse, Divider, IconButton, Paper, Stack, Toolbar, Typography} from "@mui/material";
import {theme} from "../config/theme/theme.ts";
import MenuIcon from "@mui/icons-material/Menu";
import {Link} from "react-router-dom";
import {ThemeColorControls} from "./ThemeColorControls.tsx";
import CloseIcon from '@mui/icons-material/Close';
import {useState} from "react";
import {NavBarLink} from "./NavBarLink.tsx";
import {useMediaQueries} from "../hooks/useMediaQueries.tsx";

export function NavBar() {
    const {isSmallScreen} = useMediaQueries();
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => setMenuOpen((prev) => !prev);

    return (
        <>
            <AppBar elevation={0}
                    sx={{mt: 1}}>
                <Toolbar>
                    <Typography
                        variant={"h6"}
                        component={Link}
                        to="/"
                        sx={(theme) =>
                            ({
                                flexGrow: 1,
                                color: theme.palette.primary.main,
                                textDecoration: "none",
                                fontWeight: "bold",
                            })}
                    >
                        HomeBuddy
                    </Typography>
                    {isSmallScreen && (
                        <Card id={"onboarding-fifth-step"}
                              sx={{ml: 2, p: 1, width: "fit-content"}}>
                            <IconButton
                                onClick={toggleMenu}
                                size="small"
                                aria-label="Open settings menu"
                            >
                                <MenuIcon/>
                            </IconButton>
                        </Card>
                    )}
                    {!isSmallScreen && (
                        <Card id={"onboarding-fifth-step"}
                              sx={{display: "flex", alignItems: "center"}}>
                            <Stack direction={"row"}>
                                <NavBarLink route={"/"}
                                            title={"Dashboard"}/>
                                <NavBarLink route={"/building"}
                                            title={"Gebouw"}/>
                                <NavBarLink route={"/devices"}
                                            title={"Apparaten"}/>
                                <NavBarLink route={"/scenes"}
                                            title={"Scenes"}/>
                            </Stack>
                        </Card>
                    )}
                    <ThemeColorControls/>
                </Toolbar>
            </AppBar>

            {isSmallScreen && (
                <Collapse in={menuOpen}
                          timeout="auto"
                          unmountOnExit>
                    <Paper
                        square
                        elevation={2}
                        sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            zIndex: theme.zIndex.appBar + 10,
                        }}
                    >
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{
                                position: "absolute",
                                top: 5,
                                right: 5,
                                borderRadius: 1,
                            }}
                            onClick={() => setMenuOpen(false)}
                        >
                            <CloseIcon onClick={() => setMenuOpen(false)}/>
                        </IconButton>
                        <Stack direction="column"
                               spacing={1}
                               sx={{p: 2, mt: 4}}>
                            <Typography
                                component={Link}
                                to="/"
                                sx={{textDecoration: "none", color: "text.primary"}}
                                onClick={() => setMenuOpen(false)}
                            >
                                Dashboard
                            </Typography>
                            <Divider/>
                            <Typography
                                component={Link}
                                to="/building"
                                sx={{textDecoration: "none", color: "text.primary"}}
                                onClick={toggleMenu}
                            >
                                Gebouw
                            </Typography>
                            <Divider/>
                            <Typography
                                component={Link}
                                to="/devices"
                                sx={{textDecoration: "none", color: "text.primary"}}
                                onClick={() => setMenuOpen(false)}
                            >
                                Apparaten
                            </Typography>
                            <Divider/>
                            <Typography
                                component={Link}
                                to="/scenes"
                                sx={{textDecoration: "none", color: "text.primary"}}
                                onClick={() => setMenuOpen(false)}
                            >
                                Scenes
                            </Typography>
                        </Stack>
                    </Paper>
                </Collapse>
            )}
            <Stack
                width={"100%"}
                sx={{
                    position: "absolute",
                    left: 0,
                    top: "5%",
                    zIndex: 999
                }}
                direction={"row"}
                alignItems={"center"}
                justifyContent={"center"}
            >
                <Typography
                    variant={"h5"}
                    sx={(theme) => ({
                        width: "50%",
                        textAlign: "center",
                        fontWeight: "bold",
                        color: theme.palette.primary.main,
                    })}
                >
                    IMPORTANT! Since this is a demo the database operations happen inside the browser which limits these
                    to 5 of each type.
                </Typography>
            </Stack>
        </>
    );
}