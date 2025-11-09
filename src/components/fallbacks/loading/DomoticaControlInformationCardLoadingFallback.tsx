import {Card, Skeleton, type SxProps, type Theme} from "@mui/material";

type DomoticaControlInformationCardProps = {
    sx?: SxProps<Theme>,
    style?: React.CSSProperties
}

export function DomoticaControlInformationCardLoadingFallback({sx, style}: DomoticaControlInformationCardProps) {
    return <Card
        sx={{
            position: "relative",
            height: "100%",
            ...sx
        }}
        style={style}

    >
        <Skeleton variant={"rectangular"} sx={{height:"100%",width:"100%"}}/>
    </Card>;
}



