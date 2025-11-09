import {Link, useMatch} from "react-router-dom";
import {Card, Typography} from "@mui/material";

interface NavBarLinkProps{
    route:string
    title:string
}

export function NavBarLink({route,title}:NavBarLinkProps){
    const match = useMatch({
        path: route,
        end: route === "/",
    });
    return(
        <>
            <Card
                elevation={0}
                sx={(theme) => ({
                    p: 1,
                    background: match ? theme.palette.primary.main : "transparent",
                    color: match ? theme.palette.primary.contrastText : "initial",
                })}
            >
                <Typography
                    variant="h6"
                    component={Link}
                    to={route}
                    sx={{
                        textDecoration:"none",
                        color: "inherit",
                    }}
                >
                    {title}
                </Typography>
            </Card>
        </>
    )
}