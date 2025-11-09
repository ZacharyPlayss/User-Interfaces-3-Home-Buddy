import {Box, Typography} from "@mui/material";
import {theme} from "../../config/theme/theme.ts";

interface ValueCardProps{
    label:string
    value:number | string
}

export function ValueCard({label, value}:ValueCardProps){
    return (
        <Box sx={{
            display: 'flex',
            borderRadius: 2,
            border: `2px solid ${theme.palette.primary.main}`,
            overflow: 'hidden',
            aspectRatio:"2/0.75",
            width: '40%'
        }}>
            <Box sx={{
                flex: 2,
                backgroundColor: theme.palette.primary.main,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Typography color="white">{label}</Typography>
            </Box>
            <Box sx={{
                flex: 1,
                backgroundColor: theme.palette.primary.contrastText,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Typography color="black">{value}</Typography>
            </Box>
        </Box>
    )
}
