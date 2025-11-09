import {Button, Stack, Typography} from "@mui/material";
import {AdminUser, UserUser} from "../model/User.ts";
import {useContext} from "react";
import {UserContext} from "../context/contexts/UserContext.tsx";
import { Link } from "react-router-dom";

interface AuthenticationButtonsProps{
    direction: "column"|"row"
}

export function AuthenticationButtons({direction}: AuthenticationButtonsProps) {
    const {user, setUser} = useContext(UserContext);
    return (<>
        {
            user != null &&
            <Stack
                spacing={1}
                direction={direction}
                sx={{mt: 2}}>
                <Typography>
                    Current user: {user.name}
                </Typography>
                {user.role === "user" ?
                    <Button variant={"contained"}
                            onClick={() => setUser(AdminUser)}>
                        Wissel naar <Typography component="span" sx={{ml:0.5}} fontWeight="bold">Admin</Typography> account
                    </Button>
                    :
                    <Button variant={"contained"}
                            onClick={() => setUser(UserUser)}>
                        Wissel naar <Typography component="span" sx={{ml:0.5}} fontWeight="bold">User</Typography>
                    </Button>
                }
                <Button variant={"contained"}
                        color={"secondary"}
                        component={Link}
                        to={"/"}
                        onClick={() => {setUser(null)}
                }>
                    Uitloggen
                </Button>
            </Stack>
        }
        {
            user === null &&
            <Stack
                spacing={1}
                direction={direction}
                sx={{mt: 2}}>
                <Button variant={"contained"}
                        onClick={() => setUser(AdminUser)}>
                    Inloggen als <Typography component="span" sx={{ml:0.5}} fontWeight="bold">Admin</Typography>
                </Button>
                <Button variant={"contained"}
                        onClick={() => setUser(UserUser)}>
                    Inloggen als <Typography component="span" sx={{ml:0.5}} fontWeight="bold">User</Typography>
                </Button>
            </Stack>
        }
    </>);
}

