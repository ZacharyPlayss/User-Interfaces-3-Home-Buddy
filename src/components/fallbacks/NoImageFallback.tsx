import {Box, Typography, useTheme} from "@mui/material";

interface NoImageFallbackProps{
    name:string;
    height:number;
    width?:number | string;
}

export function NoImageFallback({name,height, width=100}:NoImageFallbackProps) {
    const theme = useTheme();
    const initials = name.split(' ').map(word => word[0]).join('');
    return (
        <>
            <Box
                sx={{
                    width: width,
                    height: height,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: theme.palette.primary.main
                }}
            >
                <Typography
                    sx={{
                        fontSize: 50,
                        color:theme.palette.primary.contrastText
                }}
                >
                    {initials}
                </Typography>
            </Box>
        </>
    )
}