import {createTheme} from "@mui/material";
import {myColors} from "./colors.ts";

export const theme = createTheme({
    colorSchemes: {
        light: {
            palette: {
                mode: "light",
                primary: {
                    main: myColors.primary,
                    contrastText:myColors.white,
                },
                secondary:{
                    main:myColors.secondary,
                    contrastText:myColors.white,
                },
                background: {
                    default: myColors.white,
                    paper: myColors.white,
                }
            },
        },
        dark: {
            palette: {
                mode: "dark",
                primary: {
                    main: myColors.primary,
                    contrastText: "#fff",
                },
                secondary:{
                    main:myColors.secondary,
                    contrastText:myColors.white,
                },
            },
        },
    },
    components:{
        MuiAppBar:{
            styleOverrides:{
                root:{
                    backgroundColor:"transparent",
                    boxShadow:"none"
                }
            }
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    backdropFilter: "blur(5px)",
                    WebkitBackdropFilter: "blur(5px)",
                },
            },
        },
    }
})
